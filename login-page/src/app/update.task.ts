export class UpdateTaskDto {
    taskid!: number;
    taskname!: string;
    description!: string;
    taskstatus!: 'open' | 'inprogress' | 'done'; // Enum values
  }
  