// src/auth/task-field.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class TaskFileGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      

      if(!request.user || !request.user.role){
        throw new ForbiddenException('user role not found')
      }

      const userRole = request.user?.role; // e.g., 'Admin', 'Manager', etc.
      const body = request.body;

      if(!userRole || userRole.length === 0 ){
        throw new ForbiddenException('userole not found')
      }
  
      const roleFieldPermissions = {
        Admin: ['title', 'description', 'status', 'assignee'],
        Manager: ['title', 'status', 'assignee'],
        Employee: ['status'],
        Viewer: [],
      };
  
      const allowedFields = roleFieldPermissions[userRole] || [];
  
      const isValidUpdate = Object.keys(body).every((field) =>
        allowedFields.includes(field),
      );
  
      if (!isValidUpdate) {
        throw new ForbiddenException(
          `You are not allowed to update these fields: ${Object.keys(body).join(', ')}`,
        );
      }
  
      return true;
    }
  }
  