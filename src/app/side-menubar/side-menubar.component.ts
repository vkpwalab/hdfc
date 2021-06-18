import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menubar',
  templateUrl: './side-menubar.component.html',
  styleUrls: ['./side-menubar.component.css']
})
export class SideMenubarComponent implements OnInit {
  header_title: string;
  token:any;
  notificationCount = 0;
  username  = "";
  builder_id = "";
  constructor(private shared: SharedService, private router:Router) { }

  ngOnInit(): void {
    
    this.header_title = 'Home';
    this.username = localStorage.getItem("username");
    this.builder_id = localStorage.getItem("builder_id")

    this.shared.header_title.subscribe(
      (res) => {
        this.header_title = res;
      }
    )
    this.token = localStorage.getItem("auth-token");
    this.getNOtification()


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

  
  getNOtification() {
    let body_builders_details = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
    <soapenv:Header/>
    <soapenv:Body>
      <tem:Get_Devport_Notification>
          <!--Optional:-->
          <tem:IP></tem:IP>
          <tem:ProjectId>44436</tem:ProjectId>
          <!--Optional:-->
          <tem:Token>${this.token}</tem:Token>
      </tem:Get_Devport_Notification>
    </soapenv:Body>
</soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_Devport_Notification';
    let result_tag = 'Get_Devport_NotificationResult';
    this.shared.getData(soapaction, body_builders_details, result_tag).subscribe(
      (data) => {

        this.notificationCount = data.Table.length;
        //console.log(this.notifications)

        //this.builder_detail = data.Table[0];
        //this.branch_no = this.builder_detail.BRANCH_NO;

      }
    );
  }




}
