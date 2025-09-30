import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';


@Injectable({
  providedIn:'root'
})

export class authGuard implements CanActivate{
  constructor(private router:Router){}

  canActivate():boolean{
    const isAuthenticated = localStorage.getItem('accessToken');

    if(!isAuthenticated || this.istokenexpired(isAuthenticated)){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  private istokenexpired(isAuthenticated:string):boolean{
    try{
      const payload = JSON.parse(atob(isAuthenticated.split('.')[1]));
      const expiry = payload.exp;
      const now = Math.floor(Date.now()/1000);
      return expiry<now;
    }catch(e){
      return true;
    }
  }
}