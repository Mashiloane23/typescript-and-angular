import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edittask',
  imports: [],
  templateUrl: './edittask.component.html',
  styleUrl: './edittask.component.css'
})
export class EdittaskComponent {

  

  taskid! : number; 
  updateForm: FormGroup;
  selectedFields: string[] = [];
  taskIdToUpdate!: number;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.updateForm = this.fb.group({
      taskname: [''],
      description: [''],
      taskstatus: ['']
    });
  }
  
  onFielsChange(field:string,isChecked:boolean){
    if (isChecked){
      this.selectedFields.push(field);
    }
    else{
      this.selectedFields = this.selectedFields.filter(f =>f !== field)
    }
  }

  // onsubmit (){
  //   const 
  // }
  

}
