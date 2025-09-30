import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// import { SignupComponent } from './signup/signup.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { GettaskComponent } from './gettask/gettask.component';

import { UpdateComponent } from './update/update.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AssignroletousersComponent } from './assignroletousers/assignroletousers.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UpdatestatusComponent } from './updatestatus/updatestatus.component';
import { Roleguard } from './roleguard/roleguard.component';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  {path:'userdashboard',component:UserDashboardComponent},


  {path:'userdashboard/update-task/:taskid',component:UpdatestatusComponent,canActivate:[authGuard]},
    
  { path: 'dashboard', component: DashboardComponent ,
    canActivate:[authGuard],
    children: [

      {path:'toolbar',component:ToolbarComponent},
     
      { path: 'deletask', component: DeleteTaskComponent },
      
      {path:'assigntask',component:AssignroletousersComponent},
      {path:'createTask',component:CreateTaskComponent}
    ]




}
    
];
