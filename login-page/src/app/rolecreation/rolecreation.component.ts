import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserRole } from '../roletyenum';

@Component({
  selector: 'app-rolecreation',
  imports: [FormsModule,CommonModule],
  templateUrl: './rolecreation.component.html',
  styleUrl: './rolecreation.component.css'
})
export class RolecreationComponent {


  constructor(private roleservice:AuthService){}

  roleid:number | null = null;
  isSodtdeletd : boolean = false;
  rolename:string ='';
  description:string = '';
  roleType : string ='';
  roleTypes:string[] =Object.values(UserRole);
  rolecreatedMessage :boolean =false; 


  softdeleterole(){
    if(!this.roleid){
      alert('please enter a valid roleId');
      return;
    }

    this.roleservice.softdelete(this.roleid).subscribe({

      next:(resp)=>{
        alert(`success role is softdeleted `)
        this.isSodtdeletd = true;
      },
      error:(err)=>{
        alert(`couldn't softdelete the role`);
        this.isSodtdeletd = false;
      }
    })

  }

  
  



}
