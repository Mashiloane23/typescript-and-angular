import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskDto } from '../update.task';

@Component({
  selector: 'app-update',
  standalone: true, // Ensuring it's a standalone component
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  task: UpdateTaskDto = {
    taskid: 0,
    taskname: '',
    description: '',
    taskstatus: 'open'
  };

  message: string = '';
  taskstatusOptions: string[] = ['open', 'inprogress', 'done'];
  taskfound: boolean = false;
  taskupdated:boolean | null =null;
  showtogglesearch:boolean = false;

  updateTask():void{

    console.log('task update initiated');
  }

  constructor(private taskservice: TaskService) {}

  
  searchTask(): void {
    if (this.task.taskid <= 0) {
      this.message = 'Please enter a valid task ID to search';
      return;
    }

    this.taskservice.getTaskTaskById(this.task.taskid).subscribe(
      (task) => {
        this.task = task;
        this.taskfound = true;
        this.message = 'Task found';
        
      },
      (error) => {
        this.taskfound = false;
        this.message = 'Task not found';
        console.error('Error:', error);
        
      }
    );
  }

  cancelUpdate():void{
    this.showtogglesearch=false;
    this.task={taskid:0,taskname:'',description:'',taskstatus:'done'};
    
    this.taskfound =false
  }

  // Step 2: Update task after modifications
  onSubmit(): void {
    if (!this.taskfound) {
      this.message = 'Please search for a task first';
      return;
    }

    // Create an update object with only the modified fields
    const updateData: Partial<UpdateTaskDto> = {
      taskid: this.task.taskid,
      taskname: this.task.taskname || undefined, // Retain existing if not changed
      description: this.task.description || undefined,
      taskstatus: this.task.taskstatus || undefined
    };

    this.taskservice.updateTask(updateData).subscribe(
      (response) => {
        this.message = typeof response === 'string' ? response : 'Task updated successfully';
        console.log('Task successfully updated:', response);
        
        alert(`Task updated successfully`);

        this.taskupdated = true;
        this.resetForm();
        this.message = `task successfully updated`;
      },
      (error) => {
        this.message = 'An error has occurred while updating the task';
        console.error('Error:', error);
        alert(`Task update failed`);
        this.taskupdated = false;
      }
    );
  }
  togglesearch():void{
    this.showtogglesearch = !this.showtogglesearch;
  }



 
  resetForm(): void {
    this.task = {
      taskid: 0,
      taskname: '',
      description: '',
      taskstatus: 'open'
    };
    this.taskfound = false;
  }
}
