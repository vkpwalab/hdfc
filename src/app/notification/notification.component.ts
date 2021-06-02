import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {


  token: any;
  builder_id:any;
  notifications:any;
  constructor(public shared: SharedService,private router:Router) { }

  ngOnInit(): void {
    this.builder_id = '510673';
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

        //this.builder_detanil = data.Table[0];
        //this.branch_no = this.builder_detail.BRANCH_NO;

      }
    );
  }

  delete(notification){

    let body_builders_details = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
    <soapenv:Header/>
    <soapenv:Body>
      <tem:Update_Notification_Flag>
          <!--Optional:-->
          <tem:IP></tem:IP>
          <tem:ProjectId>${notification.PROJECT_ID}</tem:ProjectId>
          <tem:I_IS_ACTIVE>N</tem:I_IS_ACTIVE>
          <tem:UPDATED_BY>${this.builder_id}</tem:UPDATED_BY>
          <tem:I_SR_NO>${notification.SR_NO}</tem:I_SR_NO>
          <!--Optional:-->
          <tem:Token>${this.token}</tem:Token>
      </tem:Update_Notification_Flag>
    </soapenv:Body>
</soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Update_Notification_Flag';
    let result_tag = 'Update_Notification_FlagResult';
    this.shared.getData(soapaction, body_builders_details, result_tag).subscribe(
      (data) => {

        console.log(data);

        this.router.navigate(['notification']);
        location.reload();
        

        //this.builder_detail = data.Table[0];
        //this.branch_no = this.builder_detail.BRANCH_NO;

      }
    );

  }

}
