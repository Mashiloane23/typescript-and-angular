import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {

  rolename:string ='';
  description:string='';
  roleType:string='';
  successmessage:string ='';
  errormessage:string='';

  constructor(private taskservice:TaskService,private router:Router){}

  ngOnInit(): void {
    const accesstoken = localStorage.getItem('accessToken');
    if(!accesstoken){
      this.router.navigate(['/login'])
    }
  }

  createrole():void{
    if(this.roleType !== 'system' && this.roleType !== 'application'){
      alert ('wrong roletype')
      return;
    }
    const role ={
      rolename:this.rolename,
      roleType:this.roleType,
      description:this.description
    }

    console.log('sending role data:',role);

    this.taskservice.createrole(role).subscribe({
      next:(resp)=>{
        console.log('role created successfully');
        this.successmessage = 'role created successfully';
        this.errormessage='';

        this.roleType='';
        this.rolename='';
        this.description='';
      
    },error:(err)=>{
       console.error('Error in creating a role',err);

       if (err.error) {
        console.error(' Backend Error Data:', err.error);
      }

       this.successmessage='';

       this.errormessage = err.error?.message || 'Role creation failed. Please try again.';
    }}
    );
  }
  //   this.taskservice.createrole(role).subscribe(
  //     (resp)=>{
  //       console.log('role created successfully',resp);
  //       alert('role created successfully');
  //     },
  //     (err)=>{
  //       console.log('error in creating task');
  //       alert('role creation failed');
  //     }
  //   );
  // }

}
