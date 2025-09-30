import { IsNotEmpty } from 'class-validator';
import { taskstatus } from './Task-info/task-status.enum';

export class createTaskDTO {
  @IsNotEmpty()
  tittle: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status :taskstatus;
}
