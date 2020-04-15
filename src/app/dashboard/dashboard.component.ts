import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private shared : ServiceService, private router:Router) { }

  ngOnInit(): void {
    this.shared.headerTitle('Dashboard');
    if(!localStorage.getItem('auth-token')){
      alert('yess');
      this.router.navigate(['login']);
    }
    
    if(localStorage.getItem('from_login')){
      localStorage.removeItem('from_login');
      location.reload();
    }
  }

}
