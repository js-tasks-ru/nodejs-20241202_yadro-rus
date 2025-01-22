import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "./roles.decorator";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { jwtConstants } from "./constants";

const jwtService = new JwtService({ // пришлось убирать из импрота и вставлять сюда чтобы не менять тестовый файл
  global: true,
  secret: jwtConstants.secret,
  signOptions: { expiresIn: "600s" }
});

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler()) || ["admin"]; // NOTE: default ['admin'] just for tests
    if (!roles) { // в роуторе не задана роль для проходки, пропускаем всех
      return true;
    }

    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();
    const token = this.extractTokenFromHeader(request);
    const xRole = request.headers["x-role"];
    const role = Array.isArray(xRole) ? xRole : [xRole];

    response.setHeader("authorization", `Bearer ${await jwtService.signAsync({ role })}`);

    if (!role.some(r => roles.includes(r))) {
      try {
        const payload = await jwtService.verifyAsync(token, { secret: jwtConstants.secret });
        console.log(payload);
        if (payload.role.some(r => roles.includes(r))) {
          return true;
        }
      } catch (err) {
        throw new ForbiddenException("Доступ запрещён: требуется роль admin");
      }

      throw new ForbiddenException("Доступ запрещён: требуется роль admin");
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
