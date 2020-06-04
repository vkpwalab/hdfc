import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import $ from 'jquery';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  maxChars = 4000;
  role = '';
  chars = 0;
  builder_details: any = [];
  project_list: any = [];
  branch_no:any;
  search_text:string;
  builder_id: string;
  token: string;
  select_values_of_status: any;
  status_all: string;
  constructor(private shared: SharedService, private ar: ActivatedRoute) {
    console.log(ar)
  }

  ngOnInit(): void {
    this.shared.headerTitle('List All Projects');
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    
    this.selectStatusOption();
    this.getBuilersDetails();

  }

  showFilter(id) {
    if ($('#filter' + id).is(':visible')) {
      $('#filter' + id).hide();
    } else {
      $('#filter' + id).show();
    }
  }

  getBuilersDetails() {
    let body_builders_details = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:GetBuilderDetails>
                                        <!--Optional:-->
                                        <tem:BUILDERID>${this.builder_id}</tem:BUILDERID>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:GetBuilderDetails>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GetBuilderDetails';
    let result_tag = 'GetBuilderDetailsResult';
    this.shared.getData(soapaction, body_builders_details, result_tag).subscribe(
      (data) => {
        this.builder_details = data.Table[0];
        this.branch_no = this.builder_details.BRANCH_NO;
        console.log(this.builder_details);
        this.getPacProjectList();
      }
    );
  }
  getPacProjectList() {
    let body_pac_project_list = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get__Pac_Project_List>
                                        <!--Optional:-->
                                        <tem:branch>${this.branch_no}</tem:branch>
                                        <!--Optional:-->
                                        <tem:I_BUILDER_ID>${this.builder_id}</tem:I_BUILDER_ID>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get__Pac_Project_List>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get__Pac_Project_List';
    let result_tag = 'Get__Pac_Project_ListResult';
    this.shared.getData(soapaction, body_pac_project_list, result_tag).subscribe(
      (data) => {
        this.project_list = data.Table;
        console.log(this.project_list);
      }
    );

  }
  selectStatusOption() {
    console.log(this.select_values_of_status)
    this.status_all = this.select_values_of_status = 'All';

  }

}


