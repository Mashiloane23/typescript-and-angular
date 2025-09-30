import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class EmailSendDto{
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    taskid:number;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    useremail:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    taskname:string;
}