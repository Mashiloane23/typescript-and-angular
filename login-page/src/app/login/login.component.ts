import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit {
  username = '';
  password = '';
  welcomeMessage = '';
  errormessage = '';
  rolemessage = '';
  
  firstname:string='';
  lastname:string=''
  Email:string='';
  isSignUpVisible = false;
  loginAttempts: number =0;
  maxAttempts:number = 3;
  Logindisable:boolean = false;
  disableuntil:number | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
     const stored = localStorage.getItem('loginDisabledUntil');
  if (stored) {
    const disableUntil = parseInt(stored, 10);
    if (Date.now() < disableUntil) {
      this.Logindisable = true;
      this.disableuntil = disableUntil;
      this.startEnableTimer();
      this.errormessage = 'Login is temporarily disabled. Try again soon.';
    } else {
      // Timer expired
      localStorage.removeItem('loginDisabledUntil');
    }
  }
  }

  onInputChange(): void {
    this.welcomeMessage = '';
    this.errormessage = '';
  }

  onSubmit(): void {
    this.authService.signin(this.username, this.password).subscribe({
      next: (resp) => this.handleLoginSuccess(resp),
      error: (error) => this.handleLoginError(),
    });
  }

  private handleLoginSuccess(resp: any): void {
    console.log('Login successful:', resp);
    if (resp.accessToken) {
      localStorage.setItem('accessToken', resp.accessToken);
      localStorage.setItem('rolename', resp.rolename);
      localStorage.setItem('userid', resp.userid);
      this.welcomeMessage = `Welcome, ${this.username}`;
      this.rolemessage = `Role: ${resp.rolename}`;
      

      if (resp.tasks) {
        localStorage.setItem('tasks', JSON.stringify(resp.tasks)); 
        console.log('Stored tasks in localStorage:', resp.tasks);
        alert(`welcome ${this.username}`);
      }

      console.log('Stored Data in localStorage:', {
        accessToken: localStorage.getItem('accessToken'),
        rolename: localStorage.getItem('rolename'),
        tasks: localStorage.getItem('tasks'),
      });
    
    if(resp.rolename === 'admin' || resp.rolename === 'project manager'){
      this.router.navigate([
      '/dashboard'
      ])
    }else{
      this.router.navigate(['userdashboard'])
    }
  } else{
    this.errormessage= `please try again , an error occured`;
  }


  

      
  }

  private handleLoginError(): void {
    this.loginAttempts++;
    console.error('Login error:');
    this.errormessage = 'Invalid username or password';
    this.welcomeMessage = '';

    if(this.loginAttempts >= this.maxAttempts){
      const diasbletime = Date.now() + 5*60*1000;
      this.Logindisable = true;
      this.disableuntil = diasbletime
      localStorage.setItem('logindisbaled', diasbletime.toString())
      this.errormessage = 'Too many failed login attempts. Login disable';
      console.warn('Login diable due to too many attempts');
      this.startEnableTimer();

    }else{
      const remaining = this.maxAttempts - this.loginAttempts;
      this.errormessage = `Invalid username or Password you have ${remaining} attempts left.`;
    }

  
  }

  private startEnableTimer(): void{
    const now = Date.now();
    const timeleft = (this.disableuntil ?? 0)- now

    if(timeleft > 0){
      setTimeout(() =>{
        this.Logindisable = false;
        this.loginAttempts = 0 ;
        this.disableuntil = null;
        localStorage.removeItem('logindisableduntil');

      }, timeleft)
    }
  }

  createNewUser():void{
    const newUser = {
      password : this.password,
      username:this.username,
      firstname:this.firstname,
      lastname:this.lastname,
      Email:this.Email
    }

    this.authService.signup(newUser).subscribe({
      next:(resp)=>{
        console.log('user sucessfully created',resp);
        alert('user successfully created');
        this.password = '';
        this.username = '';
        this.firstname = '';
        this.lastname = '';
        this.Email = '';
        this.router.navigate(['/login'])
      },
      error:(err)=>{
        console.log('user creation is unsuccessful',err);
        alert('unseccfull');
        this.errormessage = 'signup failed'
      }
    })
  }
  toggleSignUpForm(): void {
    this.isSignUpVisible = !this.isSignUpVisible;
  }

 

  
  

 


}
