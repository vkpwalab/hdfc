import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-customer-lead',
  templateUrl: './customer-lead.component.html',
  styleUrls: ['./customer-lead.component.css']
})


export class CustomerLeadComponent implements OnInit {

  fileEntry: boolean = false
  customer_lead_form: FormGroup;
  isSubmitted = false;
  all_state: any;
  list_city: any;
  list_interested_project: any;
  project_name: any;

  selected_state: any;
  submit_button: boolean = false;
  builder_details: any;
  branch_no: any;
  project_list: any;
  project_selected: any;
  AllowedFile: any = ['jpeg', 'jpg', 'png'];
  file: any;
  file_name: any = '';
  sheet_data: any;
  sheet_uploaded: boolean;
  builder_id: string;
  token: string;
  constructor(private shared: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.shared.headerTitle('Submit Customer Lead');
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';

    this.customer_lead_form = this.fb.group({
      'I_Cust_Name': ['', Validators.required],
      'I_Cust_Email': ['', [Validators.required, Validators.email]],
      'I_Cust_Mobile': ['', [Validators.required, Validators.pattern("^([0|+[0-9]{10})$")]],
      'I_CITY': ['', Validators.required],
      'I_PROJECT_ID': ['', Validators.required],
      'I_BOOKING_STATUS': ['', Validators.required],
      'I_REMARKS': ['', Validators.required],
      'I_OTHER_PROJ_INFO': ['', Validators.required],
      'I_STATE': ['', Validators.required]
      // 'myfile': ['', Validators.required],
      // 'myprofile': ['', Validators.required]
    })

    setTimeout(() => {
      this.getBuilersDetails();
      this.getAllState();
      this.getInterestedProj();
    }, 2000);
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
  selectProjectOption(event) {
    this.project_selected = event.value;
    console.log(this.project_selected)
  }



  selectStateValue(event) {
    this.selected_state = event.value;
    let body_get_city_list = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:GET_CITY>
                                        <!--Optional:-->
                                        <tem:City>${this.selected_state}</tem:City>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:GET_CITY>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_CITY';
    let result_tag = 'GET_CITYResult';
    this.shared.getData(soapaction, body_get_city_list, result_tag).subscribe(
      (data) => {
        this.list_city = data.Table;
        console.log(this.list_city);
      }
    );
  }

  getAllState() {
    let body_get_state_list = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:Get_all_state>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                  </tem:Get_all_state>
                                </soapenv:Body>
                            </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_all_state';
    let result_tag = 'Get_all_stateResult';
    this.shared.getData(soapaction, body_get_state_list, result_tag).subscribe(
      (data) => {
        this.all_state = data.Table;
        console.log(this.all_state);
      }
    );
  }

  getInterestedProj() {
    let body_Project_By_Bldrid = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get_Project_By_Bldrid>
                                        <!--Optional:-->
                                        <tem:I_BUILDER_ID>${this.builder_id}</tem:I_BUILDER_ID>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get_Project_By_Bldrid>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_Project_By_Bldrid';
    let result_tag = 'Get_Project_By_BldridResult';
    this.shared.getData(soapaction, body_Project_By_Bldrid, result_tag).subscribe(
      (data) => {
        this.list_interested_project = data.Table;
        console.log(this.list_interested_project);
      }
    );

  }

  submitForm(data) {

    if (this.customer_lead_form.valid) {
      this.submit_button = true;
      let body_customer_lead_data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                        <soapenv:Header/>
                                        <soapenv:Body>
                                          <tem:Create_Customer_Lead>
                                              <!--Optional:-->
                                              <tem:I_Cust_Name>${data.I_Cust_Name}</tem:I_Cust_Name>
                                              <!--Optional:-->
                                              <tem:I_Cust_Email>${ data.I_Cust_Email}</tem:I_Cust_Email>
                                              <!--Optional:-->
                                              <tem:I_Cust_Mobile>${data.I_Cust_Mobile}</tem:I_Cust_Mobile>
                                              <!--Optional:-->
                                              <tem:I_CITY>${data.I_CITY}</tem:I_CITY>
                                              <!--Optional:-->
                                              <tem:I_BUILDER_ID>${this.builder_id}</tem:I_BUILDER_ID>
                                              <!--Optional:-->
                                              <tem:I_Token_Id></tem:I_Token_Id>
                                              <!--Optional:-->
                                              <tem:I_IP></tem:I_IP>
                                              <!--Optional:-->
                                              <tem:I_BOOKING_STATUS>${ data.I_BOOKING_STATUS}</tem:I_BOOKING_STATUS>
                                              <!--Optional:-->
                                              <tem:I_REMARKS>${data.I_REMARKS}</tem:I_REMARKS>
                                              <!--Optional:-->
                                              <tem:I_PROJECT_ID>${data.I_PROJECT_ID}</tem:I_PROJECT_ID>
                                              <!--Optional:-->
                                              <tem:I_OTHER_PROJ_INFO>${data.I_OTHER_PROJ_INFO}</tem:I_OTHER_PROJ_INFO>
                                              <!--Optional:-->
                                              <tem:I_CREATEBY>${this.builder_id}</tem:I_CREATEBY>
                                              <!--Optional:-->
                                              <tem:I_UPDATEDBY></tem:I_UPDATEDBY>
                                              <!--Optional:-->
                                              <tem:I_STATE>${ data.I_STATE}</tem:I_STATE>
                                              <!--Optional:-->
                                              <tem:Token>${this.token}</tem:Token>
                                          </tem:Create_Customer_Lead>
                                        </soapenv:Body>
                                    </soapenv:Envelope>`;

      let soapaction = 'http://tempuri.org/IService1/Create_Customer_Lead';
      let result_tag = 'Create_Customer_LeadResult';
      this.shared.getData(soapaction, body_customer_lead_data, result_tag).subscribe(
        (data) => {
          alert('Thank you.Your Form is Submitted Successfully.')
          location.reload();
        }
      );
    }
    else {
      alert('Please fill all the fields.')
    }
  }

  ExcelFileEvent($event) {
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
      this.file = $event.target.files[0];
      console.log(this.file)
      this.file_name = this.file.name


      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>($event.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      let reader = new FileReader();
      let that = this;
      reader.onload = (e: any) => {
        console.log('asjdh')
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        that.sheet_data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        console.log(that.sheet_data);
      };
      reader.readAsBinaryString(file);
      this.sheet_uploaded = true;
    }
  }

  uploadThroughExcel() {
    if (this.sheet_uploaded && this.project_selected) {
      for (let i = 1; i < this.sheet_data.length; i++) {
        const element = this.sheet_data[i];
        let body_customer_lead_data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                        <soapenv:Header/>
                                        <soapenv:Body>
                                          <tem:Create_Customer_Lead>
                                              <!--Optional:-->
                                              <tem:I_Cust_Name>${element[0]}</tem:I_Cust_Name>
                                              <!--Optional:-->
                                              <tem:I_Cust_Email>${element[2]}</tem:I_Cust_Email>
                                              <!--Optional:-->
                                              <tem:I_Cust_Mobile>${element[1]}</tem:I_Cust_Mobile>
                                              <!--Optional:-->
                                              <tem:I_CITY>${element[4]}</tem:I_CITY>
                                              <!--Optional:-->
                                              <tem:I_BUILDER_ID>${this.builder_id}</tem:I_BUILDER_ID>
                                              <!--Optional:-->
                                              <tem:I_Token_Id></tem:I_Token_Id>
                                              <!--Optional:-->
                                              <tem:I_IP></tem:I_IP>
                                              <!--Optional:-->
                                              <tem:I_BOOKING_STATUS>${ element[5]}</tem:I_BOOKING_STATUS>
                                              <!--Optional:-->
                                              <tem:I_REMARKS>${element[3]}</tem:I_REMARKS>
                                              <!--Optional:-->
                                              <tem:I_PROJECT_ID>${this.project_selected}</tem:I_PROJECT_ID>
                                              <!--Optional:-->
                                              <tem:I_OTHER_PROJ_INFO></tem:I_OTHER_PROJ_INFO>
                                              <!--Optional:-->
                                              <tem:I_CREATEBY>${this.builder_id}</tem:I_CREATEBY>
                                              <!--Optional:-->
                                              <tem:I_UPDATEDBY></tem:I_UPDATEDBY>
                                              <!--Optional:-->
                                              <tem:I_STATE></tem:I_STATE>
                                              <!--Optional:-->
                                              <tem:Token>${this.token}</tem:Token>
                                          </tem:Create_Customer_Lead>
                                        </soapenv:Body>
                                    </soapenv:Envelope>`;

        let soapaction = 'http://tempuri.org/IService1/Create_Customer_Lead';
        let result_tag = 'Create_Customer_LeadResult';
        this.shared.getData(soapaction, body_customer_lead_data, result_tag).subscribe(
          (data) => {
            console.log(data);
          }
        );
      }
    }
  }


  validateFile(file: File) {
    let extension = file.name.split('.').pop().toLowerCase();

    return this.AllowedFile.indexOf(extension) > -1;
  }

}
  // http://pws.hdfc.com/Devport_dmz/Devport_Out_API.svc
  // https://pws.hdfc.com/Devport_dmz/Service1.svc