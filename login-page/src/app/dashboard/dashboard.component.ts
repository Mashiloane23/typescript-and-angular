import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { RoleComponent } from "../role/role.component";
import { DeleteTaskComponent } from "../delete-task/delete-task.component";
import { GettaskComponent } from "../gettask/gettask.component";
import { UpdateComponent } from "../update/update.component";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-dashboard',
  imports: [ RouterModule, ToolbarComponent],

  templateUrl:'./dashboard.component.html',
  

  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private router:Router){}

  ngOnInit(): void {

    const accesscode =  localStorage.getItem('accessToken')
    if(!accesscode){
      console.log('no access to the system');
      alert('please login');
      this.router.navigate(['/login'])
    }
    const UserRole = localStorage.getItem('rolename');
    if (UserRole !== 'admin'){
      alert('access denied');
      this.router.navigate(['/login'])
    }
  }


  goToTaskActions(){
    this.router.navigate([`/dashboard/tasks`])
  }
  

}
