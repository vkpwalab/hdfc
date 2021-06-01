import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {


  token: any;
  notifications:any;
  constructor(public shared: SharedService) { }

  ngOnInit(): void {

    this.token = 'MH3NPYK34J0KHDI';
    this.getNOtification()
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

        this.notifications = data.Table;
        console.log(this.notifications)

        //this.builder_detail = data.Table[0];
        //this.branch_no = this.builder_detail.BRANCH_NO;

      }
    );
  }

}
