import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { SharedService } from './services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hdfc-loan';
  login: string;
  ans: string;
  status = 'ONLINE'; //initializing as online by default
  isConnected = true;
  token:any;
  notificationCount = 0;
  constructor(private router: Router, private connectionService: ConnectionService,public shared:SharedService) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "YOU ARE ONLINE";
      } else {
        this.status = "YOU ARE OFFLINE"
      }
      alert(this.status);
    });
  }


  ngOnInit(): void {
    this.token = 'MH3NPYK34J0KHDI';
    this.getNOtification()
  }
  hasRoute(route: string) {
    return this.router.url.includes(route);
    // return this.router.url;
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

