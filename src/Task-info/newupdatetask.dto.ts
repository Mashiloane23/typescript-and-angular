import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { taskstatus } from "src/Task-info/task-status.enum";


export class updateTask{

    // @IsNumber()
    // @ApiProperty()
    // taskid:number;

    @IsOptional()
    @IsString()
    description?:string;


    @IsString()
    @IsOptional()
    taskname?:string;


    @IsOptional()
    
    @IsEnum(taskstatus,{message:'taskstatus must be : open,inprogress or done'})
    taskstatus?:taskstatus;
}