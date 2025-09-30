import { Component } from '@angular/core';
import { TaskService,updateTaskDtoss } from '../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-taskcred',
  imports: [FormsModule],
  templateUrl: './taskcred.component.html',
  styleUrl: './taskcred.component.css'
})
export class TaskcredComponent {


  taskid!:number;
  taskname?:string ='';
  description?:string ='';
  taskstatus?: 'open'|'inprogress'|'done';

  constructor (private taskserv:TaskService ){}

  updateFields(){
    const fields : updateTaskDtoss = {
      taskid:this.taskid,
      
      taskstatus:this.taskstatus,

    }
    this.taskserv.updateTaskss(fields.taskid, {taskstatus:this.taskstatus}).subscribe({
      next:(res)=>{
        console.log('task updated successfully',res);
        alert('task updated successfully')
      },
      error:(err)=>{
        console.log('Error in updating task',err);
        alert('Error in updating task');
      }
    })
  }
}
