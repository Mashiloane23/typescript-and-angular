import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatetaskstatus',
  imports: [FormsModule],
  templateUrl: './updatetaskstatus.component.html',
  styleUrl: './updatetaskstatus.component.css'
})
export class UpdatetaskstatusComponent {


  constructor (private taskserv:TaskService){}
  taskid:number =0;
  taskname:string ='';

  updateTaskname(){

    if(!this.taskid || this.taskname.trim() === ''){
      alert('please type everything needed');
      return;
    }

    this.taskserv.updateTaskss(this.taskid,{taskname:this.taskname}).subscribe({
      next:(resp)=>{
        alert('taskname successfully updated');
        console.log('taskname sucessfully updated');

        this.taskname = '';
        this.taskid = 0;
      },error(err){
        alert('error in updating task');
        console.log('error in updating task');
      }
    })
  }

}
