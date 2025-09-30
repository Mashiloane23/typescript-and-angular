import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nofication-bell',
  imports: [FormsModule,CommonModule],
  templateUrl: './nofication-bell.component.html',
  styleUrl: './nofication-bell.component.css'
})
export class NoficationBellComponent implements OnInit {

  notification:{message:string}[] = [];
  userid:number =0;
  unread:number=0;

  constructor(private service:TaskService,){}

  ngOnInit(): void {
    const storedUserid = localStorage.getItem('userid');

    if(storedUserid){
      this.userid =+storedUserid;;
      this.fetchnotification();
    }

    this.fetchnotification()
  }

 fetchnotification():
 void{
  this.service.getusernotification(this.userid).subscribe({ 
     next:(data)=>{
      this.notification =data;
      this.unread = data.length;
     },error:(err)=>{
      console.error('Failed to fetch notifications',err);

     }
    
  }
     
  );
 }
 toggledropdown():void{
  this.unread =0;
 }

}
