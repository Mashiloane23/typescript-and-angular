import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-roleguard',
  imports: [],
  templateUrl: './roleguard.component.html',
  styleUrl: './roleguard.component.css'
})

@Injectable({
  providedIn:'root'
})
export class Roleguard implements CanActivate{

  constructor (private router:Router){}

  canActivate():boolean{
    const accesscode = localStorage.getItem('accessToken');
    const rolename = localStorage.getItem('rolename');

    if(!accesscode){
      alert('please log in');
      this.router.navigate(['/login']);
      return false;
    }

    if(!rolename){
      alert('acess denied');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }


}
