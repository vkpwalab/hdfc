import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginpage: FormGroup;


  constructor(private router: Router,private login_fb: FormBuilder) { }

  ngOnInit() {
    if(localStorage.getItem('auth-token')){
      this.router.navigate(['dashboard']);
    }
    this.loginpage = this.login_fb.group(
      {
        'email': ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
        'password': ['', [Validators.required]],
      }
    )
  }

  login(){
    localStorage.setItem('auth-token','loggedin');
    localStorage.setItem('from_login','yes');
    this.router.navigate(['dashboard']);
    // location.reload();
  }
  
}
