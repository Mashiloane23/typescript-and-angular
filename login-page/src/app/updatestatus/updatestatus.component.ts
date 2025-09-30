import { Component, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../interface/useless';
import { TaskService, updateTaskDtoss } from '../services/task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { taskstatus } from '../gtaskstaus';
import { NotFoundError } from 'rxjs';



@Component({
  selector: 'app-updatestatus',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './updatestatus.component.html',
  styleUrl: './updatestatus.component.css'
})
export class UpdatestatusComponent implements OnInit{

  
  task!:Task;
  statuses = Object.values(TaskStatus);
  selectedstatus!:TaskStatus;

  
  taskid!:number;
  taskname?:string ='';
  description?:string ='';
  taskststus?: 'open'|'inprogress'|'done';

  


  constructor(private taskserv:TaskService,private route :ActivatedRoute, private router:Router){}

  

  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>{
    this.taskid = Number(params.get('taskid'));
    if(this.taskid){
      
      this.getTaskdetails();
    }else{
      alert('taskid is missing');

      this.router.navigate([
      '/userdashboard'
      ])
    }
  });


  
  }

  getTaskdetails():void{
    this.taskserv.getTaskTaskById(this.taskid).subscribe(
      (resp)=>{
        this.task = resp;
        this.selectedstatus =  resp.taskstatus;
      },(error)=>{
        console.error('error in fetching task details',error);

      }
    )
  }

  updateStatus():void{

    


    this.taskserv.updateTaskstatus(this.taskid,this.selectedstatus).subscribe(
      (resp)=>{
        alert('task updated successfully');
        console.log('task is created successfully',resp)
        this.router.navigate(['userdashboard'])


        
      },(error)=>{
        console.error('error in updating task',error);
      }
    );
  }

  
  updateTaskdetails(){

    const updaetask : updateTaskDtoss ={
      taskid:this.taskid,
      taskname:this.taskname,
      description:this.description,
      taskstatus:this.taskststus

    }
    this.taskserv.updateTaskss(updaetask.taskid,updaetask).subscribe({
      next:(res)=>{
        console.log('task updated successfully:',res);
      },
      error:(err)=>{
        console.log('Error updating task:',err);
      }
    })
  }

}
