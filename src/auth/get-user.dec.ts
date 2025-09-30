import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { User } from "../user/user.entity";

export const Getuser = createParamDecorator((data, ctx:ExecutionContext): User => {
    const reg= ctx.switchToHttp().getRequest();
    return reg.user;
},);