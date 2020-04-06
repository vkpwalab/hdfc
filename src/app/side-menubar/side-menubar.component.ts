import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menubar',
  templateUrl: './side-menubar.component.html',
  styleUrls: ['./side-menubar.component.css']
})
export class SideMenubarComponent implements OnInit {
  header_title: string;
  constructor(private shared: ServiceService, private router:Router) { }

  ngOnInit(): void {
    this.header_title = 'Home';

    this.shared.header_title.subscribe(
      (res) => {
        this.header_title = res;
      }
    )
  }
  openNav() {
    document.getElementById('mySidenav').style.width = '300px';
  }
  closeNav() {
    if (this.shared.isMobile()) {
      document.getElementById('mySidenav').style.width = '0';
    }
  }

  logout(){
    if (this.shared.isMobile()) {
      document.getElementById('mySidenav').style.width = '0';
    }
    localStorage.removeItem('auth-token');
    this.router.navigate(['login']);
  }
}
