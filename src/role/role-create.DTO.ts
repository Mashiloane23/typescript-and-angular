import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { RoleAccess, UserRole } from "src/role/role.entity";

export class RoleCreateDto{

    @IsString()
    @ApiProperty()
    rolename:RoleAccess;

    @IsString()
    @ApiProperty()
    description:string;

  
    @IsString()
    @ApiProperty()
    roleType:UserRole;

}