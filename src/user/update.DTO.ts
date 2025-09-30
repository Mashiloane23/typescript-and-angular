import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";


export class updateDto{

    @IsNumber()
    @ApiProperty()
    userid:number;

    @IsString()
    @IsOptional()
    username?:string;

    @IsString()
    @IsOptional()
    lastname?:string;

    @IsString()
    @IsOptional()
    firstname?:string;

    @IsEmail()
    @IsOptional()
    Email:string;



}