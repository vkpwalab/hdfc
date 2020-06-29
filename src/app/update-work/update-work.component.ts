import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrls: ['./update-work.component.css']
})
export class UpdateWorkComponent implements OnInit {
  builder_detail: any = [];
  branch_no: any;
  project_list: any = [];
  building_list: any = [];
  project_selected: any;
  upload_doc_type: any;
  dynamic_forms: any = {};
  project_selected_detail: any;
  builder_id: string;
  token: string;
  file: any = [];
  file_name: any = [];
  file_uploaded: any = [];
  file_ext: any = [];
  index: any;
  doc_srno: any = [];
  selected_building: any;
  remark: any = [];
  search_text:any;
  selected_building_name: any;
  loading: boolean;
  constructor(private shared: SharedService, private fb: FormBuilder) {
    // this.show_progress=false;
  }

  ngOnInit(): void {
    this.shared.headerTitle('Project Progress');
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
        this.getUploadDocType();
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

  getUploadDocType() {
    let body_upload_doc_type = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get_MASTER_DATA>
                                        <!--Optional:-->
                                        <tem:I_CD_VAL>DEMAND_LTR_DOC_LIST</tem:I_CD_VAL>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get_MASTER_DATA>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_MASTER_DATA';
    let result_tag = 'Get_MASTER_DATAResult';
    this.shared.getData(soapaction, body_upload_doc_type, result_tag).subscribe(
      (data) => {
        this.upload_doc_type = data.Table;
        console.log(this.upload_doc_type);
      }
    );
  }


  projectChange(event) {
    this.loading = true;
    this.project_selected = event.value;
    this.project_selected_detail = this.project_list.filter(p => p.PROJECTID == this.project_selected);

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
        let count = 0;
        this.dynamic_forms = {};
        data.Table.forEach(element => {
          this.dynamic_forms[element.PROJ_BLDG_NO] = this.fb.group({
            'update_current_progress': [element.STAGE_OF_CONS, Validators.required],
            'percent_payment_due': [element.PERC_DUE, Validators.required],
            'progress_date': [element.PROGRESS, Validators.required],
            'doc_type': [element.DOCUMENT_TYPE, Validators.required],
            'build_no': [element.PROJ_BLDG_NO],
            'build_name': [element.BLDG_NAME],
          });

          this.file_name[count] = '';
          count++;
        });
        this.building_list = data.Table;
        this.loading = false;
        console.log(this.building_list);
      }
    );

  }

  updateBuildingData(data, index) {
    console.log(data);
    if (this.dynamic_forms[data.build_no].valid) {
      if (this.file_uploaded[index] == 'Y') {
        let body_insert_query = `
                              <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                    <tem:ins_work_progress_det>
                                      <!--Optional:-->
                                      <tem:i_project_id>${this.project_selected}</tem:i_project_id>
                                      <!--Optional:-->
                                      <tem:i_proj_bldg_no>${data.build_no}</tem:i_proj_bldg_no>
                                      <!--Optional:-->
                                      <tem:i_STAGE_OF_CONS>${data.update_current_progress}</tem:i_STAGE_OF_CONS>
                                      <!--Optional:-->
                                      <tem:i_PROGRESS>${data.progress_date}</tem:i_PROGRESS>
                                      <!--Optional:-->
                                      <tem:i_UPLD_DOC_FLAG>Y</tem:i_UPLD_DOC_FLAG>
                                      <!--Optional:-->
                                      <tem:i_user>${this.builder_id}</tem:i_user>
                                      <!--Optional:-->
                                      <tem:i_doctype>${data.doc_type}</tem:i_doctype>
                                      <!--Optional:-->
                                      <tem:i_doc_upld_srno>${this.doc_srno[index]}</tem:i_doc_upld_srno>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                    </tem:ins_work_progress_det>
                                </soapenv:Body>
                              </soapenv:Envelope>`;

        let soapaction = 'http://tempuri.org/IService1/ins_work_progress_det';
        let result_tag = 'ins_work_progress_detResult';
        this.shared.getData(soapaction, body_insert_query, result_tag).subscribe(
          (data) => {
            this.remark = '';
            this.file_name[index] = '';
            this.file_ext[index] = '';
            this.file[index] = '';
            this.file_uploaded[index] = 'N';
            alert('Building data updated!')
            console.log(data)
          }
        );
      }
    }
  }

  uploadBuildingDoc(bld_no, index) {
    let doc_type = this.dynamic_forms[bld_no].controls['doc_type'].value;
    console.log(doc_type);
    if (this.file_uploaded[index] == 'Y' && doc_type.length > 1) {
      this.shared.uploadDoc(this.file[index], this.file_ext[index], this.project_selected, doc_type, this.file_name[index]).subscribe(
        (res) => {
          if (res == 'OK') {
            this.shared.updateDocDetail(this.project_selected, this.file_name[index], this.file_ext[index], doc_type, this.remark[index]).subscribe(
              (doc_data) => {
                this.doc_srno[index] = doc_data.o_srno;
                console.log(doc_data)
              }
            )
          }
        }
      )
    } else {
      alert('Check if you have selected upload document type and uploaded the file.')
    }
  }

  openModel(bld_no,bld_name, index) {
    this.selected_building_name = bld_name;
    this.selected_building = bld_no;
    this.index = index;
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

      // var myReader: FileReader = new FileReader();
      // var that = this;
      // myReader.readAsDataURL(file);
      // myReader.onloadend = function (loadEvent: any) {
      //   that.file_base64 = loadEvent.target.result;
      //   console.log(that.file_base64);
      // };


    }
  }
}
