import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ForbiddenError } from "apollo-server-express";
import { Observable } from "rxjs";


@Injectable()
export class RoleGuard implements CanActivate{

    constructor (private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<string>('role',context.getHandler());

        const request = context.switchToHttp().getRequest();

        if(!request.user || !request.user.role){
            throw new ForbiddenException('user role not found in request')
        }
        if(!requiredRole){
            const request = context.switchToHttp().getRequest()
            const user = request.user;
        
        if (user?.role !== requiredRole){
            throw new ForbiddenException('You do not have permission to access');
        }
        }

        return true;
    }
}