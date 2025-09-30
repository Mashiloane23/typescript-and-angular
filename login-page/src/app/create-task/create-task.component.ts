import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

  constructor(private router:Router, private service:TaskService){}

  taskname:string ='';
  description:string='';
  DueDate: Date | null =null;

  createTask():void{
    

    if(!this.description.trim() || !this.taskname.trim() || !this.DueDate){
      alert(`taskname or description cannot be left empty`);
      return;
    }
    const createTask ={
      taskname:this.taskname,
      description:this.description,
      DueDate:this.DueDate
    }

  this.service.createTask(createTask).subscribe({
    next:(resp)=>{
      console.log(`task created successfullly`,resp),
      
      this.resetForm();
      const confirmed = confirm('task created successfully. click ok');
      if(confirmed){
        this.router.navigate(['/toolbar']);
      }
      
    },error:(err)=>{
      console.log('task is not created',err),
      alert(`Task was not created`);
      this.resetForm();
    }
  })
  }
  resetForm():void{
    this.taskname ='';
    this.description = '';
    this.DueDate =null;
  }

  
}
