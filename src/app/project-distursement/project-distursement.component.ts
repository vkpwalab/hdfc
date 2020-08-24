import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'app-project-distursement',
  templateUrl: './project-distursement.component.html',
  styleUrls: ['./project-distursement.component.css']
})
export class ProjectDistursementComponent implements OnInit {
  builder_detail: any = [];
  branch_no: any;
  project_list: any = [];
  building_list: any = [];
  disbursement_list: any = [];
  project_selected: any;
  building_selected: any;
  disb_detail: any;
  total_disbusment: number;
  CUSTOMER_NAME: any;
  FLAT_NO: any;
  FLOOR_NO: any;
  search_text: string;
  builder_id: string;
  token: string;
  loading: boolean;

  constructor(private shared: SharedService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Project Disbursement');
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    this.loading = true;
    this.getBuilersDetails();

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
        this.builder_detail = data.Table[0];
        this.branch_no = this.builder_detail.BRANCH_NO;
        console.log(this.builder_detail);
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
        this.loading = false;
      }
    );
  }

  projectChange(event) {
    this.disbursement_list = [];
    this.loading = true;
    this.project_selected = event.value;
    let body_Building_List = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:get_project_building>
                                      <!--Optional:-->
                                      <tem:i_project_no>${this.project_selected}</tem:i_project_no>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                  </tem:get_project_building>
                                </soapenv:Body>
                            </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/get_project_building';
    let result_tag = 'get_project_buildingResult';
    this.shared.getData(soapaction, body_Building_List, result_tag).subscribe(
      (data) => {
        this.building_list = data.Table;
        console.log(this.building_list);
        this.loading = false;
      }
    );
  }

  buildingChange(event) {
    this.loading = true;
    this.building_selected = event.value;
    let body_Project_Disb = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                              <soapenv:Header/>
                              <soapenv:Body>
                                <tem:get_devport_disb_summ>
                                    <!--Optional:-->
                                    <tem:i_project_id>61222</tem:i_project_id>
                                    <!--Optional:-->
                                    <tem:i_proj_bldg_no>105641</tem:i_proj_bldg_no>
                                    <!--Optional:-->
                                    <tem:Token>${this.token}</tem:Token>
                                </tem:get_devport_disb_summ>
                              </soapenv:Body>
                          </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/get_devport_disb_summ';
    let result_tag = 'get_devport_disb_summResult';
    this.shared.getData(soapaction, body_Project_Disb, result_tag).subscribe(
      (data) => {
        this.disbursement_list = data.Table;
        console.log(this.disbursement_list);
        this.loading = false;
      }
    );
  }

  getDisbDetail(disb: any) {
    let body_Project_Disb_Detail = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                      <soapenv:Header/>
                                      <soapenv:Body>
                                        <tem:get_devport_disb_det>
                                            <!--Optional:-->
                                            <tem:i_file_no>${disb.FILE_NO}</tem:i_file_no>
                                            <!--Optional:-->
                                            <tem:Token>${this.token}</tem:Token>
                                        </tem:get_devport_disb_det>
                                      </soapenv:Body>
                                  </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/get_devport_disb_det';
    let result_tag = 'get_devport_disb_detResult';
    this.shared.getData(soapaction, body_Project_Disb_Detail, result_tag).subscribe(
      (data) => {
        this.disb_detail = data.Table;
        console.log(this.disb_detail);
        this.CUSTOMER_NAME = disb.CUSTOMER_NAME;
        this.FLAT_NO = disb.FLAT_NO;
        this.FLOOR_NO = disb.FLOOR_NO;

        this.total_disbusment = 0;
        this.disb_detail.forEach(element => {
          this.total_disbusment += parseFloat(element.AMOUNT);
        });

      }
    );
  }


}
