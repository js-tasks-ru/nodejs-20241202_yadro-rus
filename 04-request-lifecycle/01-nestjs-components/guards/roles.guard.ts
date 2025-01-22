import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler()) || ["admin"]; // NOTE: default ['admin'] just for tests
    if (!roles) {
      return true;
    }

    const requestRole = context.switchToHttp().getRequest().headers["x-role"];
    if (!roles.includes(requestRole)) {
      throw new ForbiddenException("Доступ запрещён: требуется роль admin");
    }

    return true;
  }
}
