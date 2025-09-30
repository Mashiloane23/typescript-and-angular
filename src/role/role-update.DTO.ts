import { IsNumber, IsOptional, IsString } from "class-validator";
import { StringValueNode } from "graphql";
import { UserRole } from "./role.entity";
import { ApiProperty } from "@nestjs/swagger";


export class RoleUpdateDto{
    @IsNumber()
    @ApiProperty()
    roleid:number;

    @IsOptional()
    @IsString()
    
    rolename?:string

    @IsOptional()
    @IsString()
   
    roleType?:UserRole;

    @IsOptional()
    @IsString()
  
    description?:string;




}