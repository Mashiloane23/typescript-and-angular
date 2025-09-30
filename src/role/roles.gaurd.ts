import { ForbiddenException, Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleAccess } from './role.entity'; // Import RoleAccess Enum
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(),context.getClass()]); 
    if (!requiredRole) {
      return true; 
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.rolename){
      throw new ForbiddenException('user role not found');
    }

    return requiredRole.includes(user.rolename);
  }
}
