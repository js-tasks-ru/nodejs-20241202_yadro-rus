import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const role = context.switchToHttp().getRequest().headers['x-role'];
    if(role !== 'admin'){
      throw new ForbiddenException('Доступ запрещён: требуется роль admin');
    }
    return true;
  }
}
