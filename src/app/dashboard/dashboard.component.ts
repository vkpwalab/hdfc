import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  builders_details: any;

  constructor(private shared : SharedService, private router:Router) { }

  ngOnInit(): void {
    this.shared.headerTitle('Dashboard');
    if(!localStorage.getItem('auth-token')){
      this.router.navigate(['login']);
    }

    if(localStorage.getItem('from_login')){
      localStorage.removeItem('from_login');
      location.reload();
    }
  }



}
