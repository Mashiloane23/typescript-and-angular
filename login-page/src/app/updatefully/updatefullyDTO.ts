export interface updateTaskdto {
    taskid:number;
    taskname?:string;
    description?:string;
    taskstatus?:'open' | 'inprogress' | 'done';
}