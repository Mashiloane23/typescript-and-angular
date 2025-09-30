import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-interceptor',
  imports: [],
  templateUrl: './interceptor.component.html',
  styleUrl: './interceptor.component.css'
})

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  intercept (req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
 
    const token = localStorage.getItem('accesstoken');

    if(token){
      const cloned = req.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }else{
      return next.handle(req);
    }
  }
  }
