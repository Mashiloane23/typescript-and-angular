import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, output, ViewChild, viewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { UpdateTaskDto } from '../update.task';
import { TaskService } from '../services/task.service';
import { UpdateComponent } from '../update/update.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

import { GettaskComponent } from '../gettask/gettask.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { AssignroletousersComponent } from '../assignroletousers/assignroletousers.component';
import { RolecreationComponent } from "../rolecreation/rolecreation.component";
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { EdittaskComponent } from "../edittask/edittask.component";
import { TaskcredComponent } from '../taskupdatesStatus/taskcred.component';
import { UpdatetaskdescriptionComponent } from '../updatetaskdescription/updatetaskdescription.component';
import { UpdatestatusComponent } from '../updatestatus/updatestatus.component';
import { UpdatetaskstatusComponent } from "../updatetaskname/updatetaskstatus.component";
import { UpdatefullyComponent } from '../updatefully/updatefully.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NoficationBellComponent } from '../nofication-bell/nofication-bell.component';

@Component({
  selector: 'app-toolbar',
  imports: [FormsModule, CommonModule, ReactiveFormsModule,
    RouterModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatIconModule,
    UpdateComponent, DeleteTaskComponent, AssignroletousersComponent, GettaskComponent, CreateTaskComponent, RolecreationComponent,  TaskcredComponent, UpdatetaskdescriptionComponent,
     UpdatetaskstatusComponent,UpdatefullyComponent,MatBadgeModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

   
    showtoggleupdate :boolean =false;
    showtogglesearch:boolean = false;
    showtoggledelete:boolean =false;
    getTaskByIdtoggle:boolean =false;
    showtogglecreate:boolean=false;
    showtoggleforassihninguserstask = false;
    showtoggleforsoftdelete :boolean=false;
    showcreateroletoggle : boolean =false;
    showtoggleupdates:boolean =false;
    showtoggleupdatetaskstatus:boolean =false;
    showtoggleUpdatedescription:boolean = false;
    showtoggleforupdatetaskname:boolean = false;
    showtogglrforfullupdate:boolean =false;
    showNotifications = false;

 
  @ViewChild('sidenav') sidenav!:MatSidenav;

  constructor(private router:Router, private taskservice:TaskService){}

  isSidenavOpen = false;
  role:string='';
  notifications:any [] = [];
  userid:number=0;
  
  @Output() taskActionselect = new EventEmitter<string>();

  ngOnInit(): void {
    this.role = localStorage.getItem('rolename') || 'user';
    const storedUserid = localStorage.getItem('userid');
    if (storedUserid) {
      this.userid = +storedUserid;
      
    }
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  onTaskAction(action: string) {
    this.taskActionselect.emit(action);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private IsAdmin(): boolean {
    return localStorage.getItem('rolename') === 'admin';
  }

  toggleupdate(): void {
    if (this.IsAdmin()) {
      this.showtoggleupdate = !this.showtoggleupdate;
    } else {
      alert('Access denied! Only admins can update tasks.');
    }
  }

  createTaskToggle(): void {
    if (this.IsAdmin()) {
      this.showtogglecreate = !this.showtogglecreate;
    } else {
      alert('Access denied to this method');
    }
  }

  togglesearch(): void {
    this.showtogglesearch = !this.showtogglesearch;
  }

  toggletodelete(): void {
    this.showtoggledelete = !this.showtoggledelete;
  }

  toggleforassigningTaskAUser(): void {
    this.showtoggleforassihninguserstask = !this.showtoggleforassihninguserstask;
  }

  toggleforsoftdelete(): void {
    this.showtoggleforsoftdelete = !this.showtoggleforsoftdelete;
  }

  toggleforupdatestatus(): void {
    this.showtoggleupdatetaskstatus = !this.showtoggleupdatetaskstatus;
  }

  toggleforupdatedescription(): void {
    this.showtoggleUpdatedescription = !this.showtoggleUpdatedescription;
  }

  togglrforupdatetaskname(): void {
    this.showtoggleforupdatetaskname = !this.showtoggleforupdatetaskname;
  }

  toggleforfullupdate(): void {
    this.showtogglrforfullupdate = !this.showtogglrforfullupdate;
  }

  toggleNotification():void{
    this.showNotifications = !this.showNotifications;
  }

 

}
