import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../enviroment/enviroment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Task, TaskStatus } from '../interface/useless';
import { UpdateTaskDto } from '../update.task';
import { taskstatus } from '../gtaskstaus';


export interface updateTaskDtoss{
  taskid:number,
  taskname?:string,
  taskstatus?:'open'|'inprogress'|'done',
  description?:string

}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  

  private url = `${environment.apiBaseUrl}/role`;
  private urls = `${environment.apiBaseUrl}/Tasks`;
  private Taskurl = `${environment.apiBaseUrl}/Tasks`
  private usr = `${environment.apiBaseUrl}/role`

  constructor(private http:HttpClient) { }

  createTask(task:{taskname:string,description:string,DueDate:Date}):Observable<any>{

    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    const theUrl = `${this.urls}/create-Task`
    return this.http.post(theUrl, task, {headers}).pipe(
      tap((response) => console.log('Received response:', response)), 
      catchError((error) => {
        console.error('Error in HTTP request:', error);  
        return throwError(error);  
      })
    );
    
    
    
  }

  deleteTask(taskid:number):Observable<any>{

    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    const newurl= `${this.urls}/delete-task/${taskid}`;

    return this.http.delete(newurl,{responseType:'text',headers} );
  }

  updateTask(task: Partial<UpdateTaskDto> ): Observable<any> {

    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    const urlbase = `${this.urls}/updateTask`; 
    

    const updateTask: Partial<UpdateTaskDto> = {
      taskid: task.taskid,
      taskname: task.taskname || undefined, 
      description: task.description || undefined,
      taskstatus: task.taskstatus || undefined,
    };

    console.log('Sending PUT request with:', updateTask,{responseType:'text'});
    

    return this.http.put(urlbase, updateTask, {headers}).pipe(
      tap((res) => {
        console.log('Task updated response:', res);
      }),
      catchError((err) => {
        console.error('Error updating task:', err);
        return throwError(err);
      })
    );
  }
  

 
  getTaskTaskById(taskid: number): Observable<any> {

    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    const url = `${this.urls}/getTaskById/${taskid}`; 
    return this.http.get(url , {headers} ).pipe(
      tap((res) => {
        console.log('Fetched task:', res);
      }),
      catchError((err) => {
        console.error('Error fetching task:', err);
        return throwError(err);
      })
    );
  } 

  GetUsersTasks(userid:number):Observable<any>{
    
    const url = `${this.urls}/${userid}`;
    console.log('Fetching tasks from:', url);
    return this.http.get(url).pipe(
        catchError((error) => {
            console.error('Failed to fetch user tasks:', error);
            throw error;
        })
    );
  }

  createrole(role:{description:string,rolename:string,roleType:string}):Observable<{message:string}>{

    const url = `${this.urls}/create`;
    console.log('Posting to URL:', url, 'with data:', role);
    return this.http.post<{message:string}>(url,role)
    
  
  
  }

  assignTaskNotification(userId: number, taskId: number): Observable<{ success: boolean; message: string }> {
    
    const url = `${this.urls}/assign/${userId}/${taskId}`;
    
    return this.http.post<{ success: boolean; message: string }>(url, {});
  }

  getusernotification(userid:number):Observable<{message:string,createdAt:string}[]>{
    
    return this.http.get<{message:string;createdAt:string}[]>(`${this.urls}/user/${userid}`);
  }


  

  geAllTask():Observable<any>{
    const getalltask = `${this.urls}/all-tasks`

    return this.http.get(getalltask)
  }

  assigntaskstousers(roleanduser:{taskid:number,userid:number[]}):Observable<string>{
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    const url = `${this.urls}/assignTasks`;
    return this.http.post<any>(url,roleanduser,{responseType:'text' as 'json',headers}).pipe( tap((res) => {
      console.log('Fetched task:', res);
    }),
    catchError((err) => {
      console.error('Error fetching task:', err);
      return throwError(err);
    }));
  }

  getTaskForUser(userid: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.urls}/user/${userid}`).pipe(
      map(tasks =>
        tasks.map(task => ({
          ...task,  
          taskstatus : task.taskstatus as TaskStatus,
          
        }))
      )
    );
  }

  
  updateTaskstatus(taskid:number,status:string):Observable<any>{

    const token = localStorage.getItem('accessToken');
    console.log('token:',token);
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    const updateData = {status:status};
    return this.http.patch(`${this.urls}/task/${taskid}/${status}`,updateData,{headers}).pipe(
      tap((res)=> console.log('updated task:',res)),
      catchError((err)=>{
        console.error('error in updating :',err);
        return throwError(err);
      })
      
    );
  }

  updateTasks(taskid:number,taskdata:any):Observable<any>{
    
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.put(`${this.urls}/${taskid}`,taskdata,{headers});
  }

  updateTaskss(taskid:number,updateTask:Partial<updateTaskDtoss>): Observable<any>{
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.put(`${this.urls}/${taskid}`,updateTask,{headers});
  }

  notification(taskid:number,userid:number):Observable<any>{
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post(`${this.urls}/assign/${userid}/${taskid}`,{headers});
  }

  getNotification(userid:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.urls}/${userid}`);
  }

  
  
  

  
}
