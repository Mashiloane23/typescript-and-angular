import { SetMetadata } from "@nestjs/common";
import { RoleAccess } from "./role.entity";


export const Roles =(...roles:RoleAccess[]) => SetMetadata('role',roles);