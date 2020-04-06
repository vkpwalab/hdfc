import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hdfc-loan';
  login: string;
  ans: string;
  constructor(private router: Router) {
    
   }

  ngOnInit(): void {
   
  }
  hasRoute(route: string) {
    return this.router.url.includes(route);
    // return this.router.url;
  }
  
  }

