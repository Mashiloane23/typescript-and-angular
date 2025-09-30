import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../enviroment/enviroment';
import { UserRole } from '../roletyenum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl = `${environment.apiBaseUrl}/auth`
  private roleurl = `${environment.apiBaseUrl}/role`

  constructor(private http:HttpClient) { }

  testconnection() : Observable<string>{
    return this.http.get<string>(this.apiurl);
  }
  
  signin(username: string, password: string): Observable<{accesstoken:string;rolename:string}> {
    const credent = {username,password};

    const url = `${this.apiurl}/signin` ;
    console.log('making request to :', this.apiurl);
    return this.http.post<{accesstoken:string;rolename:string}>(url, {password,username}).pipe(
      tap(resp=>{
        localStorage.setItem('token',resp.accesstoken);
      })
    )
  }

  signup(createUser:{username:string,password:string,firstname:string,lastname:string,Email:string}):Observable<any>{
    const url = `${this.apiurl}/signup`

    return this.http.post(url,createUser);
  }

  softdelete(roleid:number):Observable<any>{
    return this.http.delete<any>(`${this.roleurl}/roleid/${roleid}`)
  }

  createrole(create:{rolename:string,description:string,roleType:UserRole}):Observable<any>{
    return this.http.post<any>(`${this.roleurl}/create`, {create});
  }



  

  
}
