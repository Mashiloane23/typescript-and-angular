import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../interface/useless';

@Component({
  selector: 'app-gettask',
  standalone:true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './gettask.component.html',
  styleUrl: './gettask.component.css'
})
export class GettaskComponent {
  task :any =null;
  taskid:number=0;
  tasks:Task[]=[];

  showsearchInput:boolean =false;

  constructor(private taskservice:TaskService){}

  toglesearchInput():void{
    this.showsearchInput = !this.showsearchInput;
  }
  getTaskByID():void{
    if(!this.taskid || isNaN(this.taskid)){
      alert('enter valid taskid');
      return;
    }

    this.taskservice.getTaskTaskById(this.taskid).subscribe({
      next:(resp)=>{
        console.log('Task found',resp);
        alert('Task found');
        this.task = resp
      }, error:(err)=>{
        console.log('no task found');
        alert('no task');
        this.task = null;
      }
    })
    
  }

  // ngOnInit(): void {
  //   this.taskservice.getTaskForUser()
  // }
}
