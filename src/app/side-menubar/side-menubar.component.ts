import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-side-menubar',
  templateUrl: './side-menubar.component.html',
  styleUrls: ['./side-menubar.component.css']
})
export class SideMenubarComponent implements OnInit {
  header_title:string;
  constructor(private shared : ServiceService) { }

  ngOnInit(): void {
    this.header_title = 'Home';

    this.shared.header_title.subscribe(
      (res)=>{
        this.header_title = res;
      }
    )
  }
  openNav() {
    document.getElementById('mySidenav').style.width = '300px';
  }
   closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }
}
