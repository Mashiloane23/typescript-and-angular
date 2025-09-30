import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { taskstatus } from "src/Task-info/task-status.enum";

export class updateTaskStatusDto{
    @IsEnum(taskstatus)
    @ApiProperty()
    status:taskstatus;
}