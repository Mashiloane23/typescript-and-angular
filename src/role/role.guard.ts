import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "./role.entity";
import { request } from "http";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const Request = context.switchToHttp().getRequest();
    const userole = Request.user?.role;
    const body = Request.body;

    const rolefieldpermission = {
      admin:['taskname','description','taskstatus'],
      project_manager :['description','taskstatus'],
      developer:['status'] 
    };

    const allowedfields = rolefieldpermission[userole] || [];
    const requestedfields = Object.keys(body);

    const isvalidupdate = requestedfields.every((field) => allowedfields.includes(field));


    if(isvalidupdate){
      throw new ForbiddenException(
        `Role ${userole} cannot update fields ${requestedfields.filter((f)=>!allowedfields.includes(f)).join(',')}`,
      );
    }

    return true;
  }

  
}
