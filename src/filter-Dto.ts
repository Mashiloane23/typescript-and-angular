import { IsEnum, IsOptional, IsString } from 'class-validator';
import { taskstatus } from './Task-info/task-status.enum';

export class FilterDTO {
  @IsOptional()
  @IsEnum(taskstatus)
  status?: taskstatus;

  @IsOptional()
  @IsString()
  search?: string;
}
