import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEnum, IsString } from "class-validator";
import { taskstatus } from "src/Task-info/task-status.enum";
import { PrimaryGeneratedColumn } from "typeorm";


export class createTaskDto{
   

    @IsString()
    @ApiProperty()
    taskname:string;

    @IsString()
    @ApiProperty()
    description:string;

    @IsDateString()
    @ApiProperty()
    DueDate:Date;



}