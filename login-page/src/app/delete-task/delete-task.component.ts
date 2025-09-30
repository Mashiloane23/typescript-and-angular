import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-task',
  standalone:true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent {
  TaskIdTodelete :number| null =null;
  isDeleted: boolean | null =null;
constructor (private taskservice:TaskService){}

DeleteTask(): void {
  if (this.TaskIdTodelete === null || isNaN(Number(this.TaskIdTodelete))) {
    alert("Enter a valid Task ID");
    return;
  }

  this.taskservice.deleteTask(this.TaskIdTodelete).subscribe({
    next: (resp) => {
      console.log(`Task with Task ID ${this.TaskIdTodelete} is successfully deleted`);
      alert("Task successfully deleted");
      this.isDeleted = true;
      this.TaskIdTodelete = null;
    },
    error: (err) => {
      console.error("Error deleting task:", err);
      alert("Couldn't delete task");
      this.isDeleted = false;
    }
  });
}

}
