import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{

  constructor(private services:TaskService,private route:Router){}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userid'));

    this.services.notification
  }
  

}
