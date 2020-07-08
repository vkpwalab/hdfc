import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raise-demand',
  templateUrl: './raise-demand.component.html',
  styleUrls: ['./raise-demand.component.css']
})
export class RaiseDemandComponent implements OnInit {
  project_id: any;
  building_id: any;
  demand_letter: any = [];
  builder_id: string;
  token: string;
  dynamic_forms: any = {};
  search_text: any;
  file_selected: any;
  cust_name_selected: any;
  file: any = [];
  file_name: any = [];
  file_ext: any = [];
  file_uploaded: any = [];
  index: any;
  doc_srno: any = [];
  remark: any = '';
  loading: boolean;
  raise_doc: any;
  demand_letter_len: any = 0;
  building_name: any;
  constructor(private shared: SharedService, private activatedRoute: ActivatedRoute, private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.shared.headerTitle('Raise Demand Letter');
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    this.activatedRoute.params.subscribe(params => {
      if (params['pid']) {
        this.project_id = params['pid'];
        this.building_id = params['bid'];
        this.building_name = params['b_name'];
      } else {
        this.route.navigate(['dashboard']);
      }
    });

    this.loading = true;
    this.getRaiseDemandLetter();
  }

  getRaiseDemandLetter() {
    let body_raise_demand_letter = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:get_file_list>
                                        <!--Optional:-->
                                        <tem:i_project_id>${this.project_id}</tem:i_project_id>
                                        <!--Optional:-->
                                        <tem:i_proj_bldg_no>${this.building_id}</tem:i_proj_bldg_no>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:get_file_list>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/get_file_list';
    let result_tag = 'get_file_listResult';
    this.shared.getData(soapaction, body_raise_demand_letter, result_tag).subscribe(
      (data) => {
        data.Table.forEach(element => {
          this.dynamic_forms[element.FILE_NO] = this.fb.group({
            'soc': [element.STAGE_OF_CONST, Validators.required],
            'due_perc': [element.DUE_PERC, Validators.required],
          });

        });
        this.demand_letter = data.Table;
        this.demand_letter_len = this.demand_letter.length;
        this.loading = false;
        console.log(this.demand_letter);
      }
    );
  }


  updateDemandLetter(data,demand, index) {
    console.log(data);
    if (this.dynamic_forms[demand.FILE_NO].valid) {
      if (this.file_uploaded[index] == 'Y') {
        let body_insert_demand= `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                    <soapenv:Header/>
                                    <soapenv:Body>
                                        <tem:ins_dev_port_demand_ltr>
                                          <!--Optional:-->
                                          <tem:i_project_id>${this.project_id}</tem:i_project_id>
                                          <!--Optional:-->
                                          <tem:i_proj_bldg_no>${this.building_id}</tem:i_proj_bldg_no>
                                          <!--Optional:-->
                                          <tem:i_file_no>${demand.FILE_NO}</tem:i_file_no>
                                          <!--Optional:-->
                                          <tem:i_CUSTOMER_NAME>${demand.CUSTOMER_NAME}</tem:i_CUSTOMER_NAME>
                                          <!--Optional:-->
                                          <tem:i_FLAT_NO>${demand.FLAT_NO}</tem:i_FLAT_NO>
                                          <!--Optional:-->
                                          <tem:i_FLOOR_NO>${demand.FLOOR_NO}</tem:i_FLOOR_NO>
                                          <!--Optional:-->
                                          <tem:i_STAGE_OF_CONST>${data.soc}</tem:i_STAGE_OF_CONST>
                                          <!--Optional:-->
                                          <tem:i_DUE_PERC>${data.due_perc}</tem:i_DUE_PERC>
                                          <!--Optional:-->
                                          <tem:i_PENDING_DISB_AMT>${demand.PENDING_DISB_AMOUNT}</tem:i_PENDING_DISB_AMT>
                                          <!--Optional:-->
                                          <tem:i_UPLD_DEMAND_LTR_FLAG>${this.file_uploaded[index]}</tem:i_UPLD_DEMAND_LTR_FLAG>
                                          <!--Optional:-->
                                          <tem:i_DEMAND_LETTER_RAISE_STS>${demand.DEMAND_LETTER_RAISE_STS}</tem:i_DEMAND_LETTER_RAISE_STS>
                                          <!--Optional:-->
                                          <tem:i_user>${this.builder_id}</tem:i_user>
                                          <!--Optional:-->
                                          <tem:i_doc_upld_srno>${this.doc_srno[index]}</tem:i_doc_upld_srno>
                                          <!--Optional:-->
                                          <tem:Token>${this.token}</tem:Token>
                                        </tem:ins_dev_port_demand_ltr>
                                    </soapenv:Body>
                                  </soapenv:Envelope>`;

        let soapaction = 'http://tempuri.org/IService1/ins_dev_port_demand_ltr';
        let result_tag = 'ins_dev_port_demand_ltrResult';
        this.shared.getData(soapaction, body_insert_demand, result_tag).subscribe(
          (data) => {
            this.remark = '';
            this.file_name[index] = '';
            this.file_ext[index] = '';
            this.file[index] = '';
            this.file_uploaded[index] = 'N';
            alert('Demand Letter Updated')
            console.log(data)
          }
        );
      }
    }
  }
  
  openModel(file_no, cust_name, index) {
    this.file_selected = file_no;
    this.cust_name_selected = cust_name;
    this.index = index;
  }

  uploadDemandDoc(file_no, index) {

    if (this.file_uploaded[index] == 'Y') {
      this.shared.uploadDoc(this.file[index], this.file_ext[index], this.project_id, 'DEV_LTR', this.file_name[index]).subscribe(
        (res) => {
          if (res == 'OK') {
            this.shared.updateDocDetail(this.project_id, this.file_name[index], this.file_ext[index], 'DEV_LTR', this.remark).subscribe(
              (doc_data) => {
                this.doc_srno[index] = doc_data.o_srno;
                console.log(doc_data)
              }
            )
          }
        }
      )
    } else {
      alert('Check if you have uploaded the file.')
    }
  }

  uploadFileEvent($event, index) {
    if ($event.target.files[0]) {
      var file: File = $event.target.files[0];
      // if (!this.validateFile(file)) {
      //   alert("Unsupported image format");
      //   return false;
      // }

      if (file.size > 4294967296) {
        alert("Max. File size: 4GB");
        return false;
      }

      this.file[index] = $event.target.files[0];
      console.log(this.file)
      this.file_name[index] = this.file[index].name.split('.')[0]
      this.file_uploaded[index] = 'Y';
      this.file_ext[index] = this.file[index].name.split('.').pop();

    }
  }

  getAllDoc(){
    let body_Show_All_Doc = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                              <soapenv:Header/>
                              <soapenv:Body>
                                <tem:Show_All_Doc>
                                    <!--Optional:-->
                                    <tem:I_PROJECT_No>${this.project_id}</tem:I_PROJECT_No>
                                </tem:Show_All_Doc>
                              </soapenv:Body>
                          </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Show_All_Doc';
    let result_tag = 'Show_All_DocResult';
    this.shared.getData(soapaction, body_Show_All_Doc, result_tag).subscribe(
      (data) => {
        let all_doc = data.Table;
        all_doc.forEach(element => {   
          if(element.DOCUMENTCODE == 'DEV_LTR'){
            this.raise_doc.push(element);
          }
        });
      }
    );
  }
}
