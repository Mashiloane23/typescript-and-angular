import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { taskstatus } from "src/Task-info/task-status.enum";

export class updateTaskDto {
  @IsNumber()
  @ApiProperty()
  taskid: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  taskname?: string;

  @IsEnum(taskstatus, { message: "taskstatus must be one of: open, inprogress, done" })
  @IsOptional()
  taskstatus?: taskstatus;
}
