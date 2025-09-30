import { Component } from '@angular/core';
import { TaskService, updateTaskDtoss } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updatefully',
  imports: [FormsModule,CommonModule],
  templateUrl: './updatefully.component.html',
  styleUrl: './updatefully.component.css'
})
export class UpdatefullyComponent {
  taskid:number = 0;
  taskname?:string;
  description?:string;
  taskstatus?: 'open'|'description'|'done';
  isError:boolean = false;
  feedbackmessage:string ='';

  constructor (private taskserv:TaskService){}

  updateTask(){

    if(!this.taskid){
      alert('Task ID is required');
      return;
    }

    const updateFields:Partial<updateTaskDtoss> ={};

    if(this.taskname) updateFields.taskname = this.taskname;
    if(this.description) updateFields.description = this.description;
    if(this.taskstatus) updateFields.taskstatus = this.taskstatus.toLocaleLowerCase() as 'open'|'inprogress'|'done';

    this.taskserv.updateTaskss(this.taskid,updateFields).subscribe({
      next:(res)=>{
        this.feedbackmessage = 'task successfully updated';
        alert('Task updated successfully');
        this.clearForm();
        this.isError = false;
      },
      error:(err)=>{
        console.error('Error updating task:',err);
        alert('failed to update task');
        this.feedbackmessage = 'error in updating task'
        if(err.status === 404){
          alert('no taskid found');
        }else{
          alert('failed to update')
        }
        this.isError = true;
      }
    });

    


  }

  clearForm(){
    this.taskname ='';
    this.description ='';
    this.taskstatus =undefined;
    this.taskid =0;
  }
}
