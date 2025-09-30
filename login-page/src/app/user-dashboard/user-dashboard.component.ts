import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy, RouterModule } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task, TaskStatus } from '../interface/useless';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,MatIconModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{

  tasks:Task []=[];
  task!:Task;
  IsStatusupdated = false;

  constructor(private route:Router, private taskservice:TaskService){}

  ngOnInit(): void {
    this.loadTasks();

    

    
  }

  

  private loadTasks():void{
    const storedTask = localStorage.getItem('tasks');

    if(storedTask){
      this.tasks = JSON.parse(storedTask);
      console.log('tasks loaded from local storage:',this.tasks);
    }else{
      const userid = localStorage.getItem('userid');
      
      if(userid){
        this.taskservice.getTaskForUser(Number(userid)).subscribe(
          (tasks)=>{
            this.tasks = tasks;
            localStorage.setItem('tasks',JSON.stringify(tasks));

          },(error)=>{
            console.error(`error in loading tasks`,error);

          }
          )
        
      }
    }
  }

  navigateToUpdate(taskid:number):void{
    if(!taskid){
      console.error('taskid is undefined ');
      return;
    }
    localStorage.setItem('selectedTaskId',taskid.toString());
    this.route.navigate(['/userdashboard/update-task',taskid]);
  }


  updateStatus(taskid:number,newstatus:TaskStatus):void{
    localStorage.setItem('selectedTaskId',taskid.toString());

    this.taskservice.updateTaskstatus(taskid,newstatus).subscribe(
      (resp)=>{
        console.log(`Task ${taskid} status updated to ${newstatus}`);

        this.loadTasks();

      },(error)=>{
        console.log('error updating task status:',error);
      }
    )
  }

  logout(): void {
    localStorage.clear();
    this.route.navigate(['/login'])
  }

  
}
