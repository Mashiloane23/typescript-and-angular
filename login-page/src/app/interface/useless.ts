export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'inprogress',
  COMPLETED = 'done',
}


export interface Task {
    taskid: number;
    taskname: string;
    description: string;
    taskstatus: TaskStatus;
  }
  