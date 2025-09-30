import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";


export class TaskForUserDto{

    @ApiProperty()
    @IsNumber()
    userid:number;

    @ApiProperty()
    @IsNumber()
    taskid:number;


    @ApiProperty()
    @IsString()
    taskDescription:string;
}