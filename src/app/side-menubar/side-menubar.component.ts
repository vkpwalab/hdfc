import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menubar',
  templateUrl: './side-menubar.component.html',
  styleUrls: ['./side-menubar.component.css']
})
export class SideMenubarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  openNav() {
    document.getElementById('mySidenav').style.width = '300px';
  }
   closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }
}
