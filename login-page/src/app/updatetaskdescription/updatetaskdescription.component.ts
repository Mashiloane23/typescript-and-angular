import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatetaskdescription',
  imports: [FormsModule],
  templateUrl: './updatetaskdescription.component.html',
  styleUrl: './updatetaskdescription.component.css'
})
export class UpdatetaskdescriptionComponent {

  taskid:number = 0;
  description:string ='';

  constructor( private taskservice:TaskService){}

  updateDescription(){

    if (!this.taskid  || this.description.trim() === ''){
      alert('please fill the empty spaces')
      return;
    }
    this.taskservice.updateTaskss(this.taskid,{description:this.description}).subscribe({
      next:(res)=>{
        console.log('description successfully updated',res);
        alert('description updated successfully');
        this.taskid = 0;
        this.description = '';

        
      },error:(err)=>{
        console.log('Error in updating task',err);
        alert('Failed in updating description');
      }
    });
  }

}
