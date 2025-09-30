import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interface/useless';

@Component({
  selector: 'app-gealltask',
  imports: [],
  templateUrl: './gealltask.component.html',
  styleUrl: './gealltask.component.css'
})
export class GealltaskComponent {

  tasks : Task[] =[];
  message:string ='';

  constructor(private taskservice:TaskService){}

  getallTssk():void{
    this.taskservice.geAllTask().subscribe(
      (task:Task[])=>{
        this.tasks = task;
        this.message ='';
      },
      (error)=>{
        this.message ='failed to fetch tasks';
        console.error('Error fetching tasks:',error)
      }
      );
      
    
  }

}
