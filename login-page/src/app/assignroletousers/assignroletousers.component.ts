import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignroletousers',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './assignroletousers.component.html',
  styleUrl: './assignroletousers.component.css'
})
export class AssignroletousersComponent {

  taskid:number =0;
  userid:string = '';
  TaskAssigned: boolean | null = null;
  isTaskassigned:string='';
  constructor(private router:Router,private service:TaskService){}

  assignTask():void{

    const useridArray:number[] = this.userid.split(',').map(rs=> parseInt(rs.trim(),10));

    const payload ={
      taskid:this.taskid,
      userid:useridArray
    }

    this.service.assigntaskstousers(payload).subscribe({
      next:(resp)=>{
        console.log('task assigned to user/s successfully',resp);

        const confirmed = confirm('Task is assigned successfully');

        this.resetForm();
      if(confirmed){
        this.router.navigate(['/dashboard']);
      }
        
      },
      error:(err)=>{
        console.error(`task wasn't assigned`,err);
        
        this.TaskAssigned = false;
        this.isTaskassigned ='task wasnot assigned ';
        this.resetForm();
      }
    });

    
  }
  resetForm():void{
    this.taskid=0,
    this.userid='';
    this.TaskAssigned = null;
    this.isTaskassigned = '';
  }
}
