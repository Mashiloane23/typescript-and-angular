import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";

export enum UserRole{
    System = 'system',
    Application = 'application',

}
export class roleDTO{
    
    @IsString()
    rolename:string;

    @IsString()
    description:string;

    
    

    @IsEnum(UserRole)
    roleType:UserRole;






}