import { Injectable } from "@angular/core";
import { environment } from "../enviroment/enviroment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiBaseUrl}/role`;

    constructor(private http:HttpClient){}

    softDelete(roleid:string):Observable<any>{
      
      return this.http.post<any>(`${this.url}/role`,{roleid});
    }

}
