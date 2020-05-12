import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ISoapMethodResponse } from 'ngx-soap';
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
  constructor(private shared : SharedService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Project Disbursement');

    this.getBuilersDetails();
  
  }

  getBuilersDetails(){
    let body_builders_details = { BUILDERID: '510673', Token: 'MH3NPYK34J0KHDI' };

    setTimeout(() => {
      (<any>this.shared.client).GetBuilderDetails(body_builders_details).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.GetBuilderDetailsResult;

          var result_json = JSON.parse(result)

          this.builder_detail = result_json.Table;
          console.log(this.builder_detail);
         
          this.branch_no = this.builder_detail[0].BRANCH_NO;

          this.getPacProjectList();
        },
        err => console.log(err)
      );
    }, 1000);
  }

  getPacProjectList(){
    let body_Pac_Project_List = { branch: this.branch_no, I_BUILDER_ID: '510673', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get__Pac_Project_List(body_Pac_Project_List).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get__Pac_Project_ListResult;

        var result_json = JSON.parse(result)

        this.project_list = result_json.Table;

        console.log(this.project_list);
      },
      err => console.log(err)
    );

  }

  projectChange(event){
    this.project_selected = event.value;

    let body_Building_List = { i_project_no: this.project_selected, Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).get_project_building(body_Building_List).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.get_project_buildingResult;

        var result_json = JSON.parse(result)

        this.building_list = result_json.Table;

        console.log(this.building_list);
      },
      err => console.log(err)
    );
  }

  buildingChange(event){
    this.building_selected = event.value;

    // let body_Project_Disb = { i_project_no: this.project_selected, i_proj_bldg_no: this.building_selected, Token: 'MH3NPYK34J0KHDI' };
    let body_Project_Disb = { i_project_id: 61222, i_proj_bldg_no: 105641, Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).get_devport_disb_summ(body_Project_Disb).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.get_devport_disb_summResult;

        var result_json = JSON.parse(result)

        this.disbursement_list = result_json.Table;

        console.log(this.disbursement_list);
      },
      err => console.log(err)
    );
  }

  getDisbDetail(disb:any){
    let body_Project_Disb_Detail = { i_file_no: disb.FILE_NO, Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).get_devport_disb_det(body_Project_Disb_Detail).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.get_devport_disb_detResult;

        var result_json = JSON.parse(result)

        this.disb_detail = result_json.Table;

        this.CUSTOMER_NAME = disb.CUSTOMER_NAME;
        this.FLAT_NO = disb.FLAT_NO;
        this.FLOOR_NO = disb.FLOOR_NO;

        this.total_disbusment = 0;
        this.disb_detail.forEach(element => {
          this.total_disbusment += parseFloat(element.AMOUNT);
        });

        console.log(this.disb_detail);
      },
      err => console.log(err)
    );
  }
}
