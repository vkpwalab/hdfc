import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  


  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('auth-token')){
      this.router.navigate(['dashboard']);
    }
  }

  login(){
    localStorage.setItem('auth-token','loggedin');
    localStorage.setItem('from_login','yes');
    this.router.navigate(['dashboard']);
    // location.reload();
  }
  
}
