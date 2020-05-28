import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

import { ISoapMethodResponse } from 'ngx-soap';


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
  file_name: any;

  constructor(private shared: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.shared.headerTitle('Submit Customer Lead');
    this.customer_lead_form = this.fb.group({
      'I_Cust_Name': ['', Validators.required],
      'I_Cust_Email': ['', [Validators.required, Validators.email]],
      'I_Cust_Mobile': ['', [Validators.required, Validators.pattern("^([0|+[0-9]{10})$")]],
      'I_CITY': ['', Validators.required],
      'I_IP': ['', Validators.required],
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
    let body_builders_details = { BUILDERID: '510673', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).GetBuilderDetails(body_builders_details).subscribe(

      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.GetBuilderDetailsResult;
        console.log(result);

        var result_json = JSON.parse(result)
        console.log("object", result_json)


        this.builder_details = result_json.Table;

        this.branch_no = this.builder_details[0].BRANCH_NO;

        this.getPacProjectList();
      },
      err => console.log(err)
    );
  }
  getPacProjectList() {
    let body_Pac_Project_List = { branch: this.branch_no, I_BUILDER_ID: '510673', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get__Pac_Project_List(body_Pac_Project_List).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get__Pac_Project_ListResult;
        console.log(result);

        var result_json = JSON.parse(result)
        console.log("object", result_json)

        this.project_list = result_json.Table;


      },
      err => console.log(err)
    );


  }
  selectProjectOption(event) {
    this.project_selected = event.value;
    console.log(this.project_selected)
  }

  submitForm(data) {

    let body_customer_lead_data = { I_Cust_Name: data.I_Cust_Name, I_Cust_Email: data.I_Cust_Email, I_Cust_Mobile: data.I_Cust_Mobile, I_CITY: data.I_CITY, I_IP: 'data.I_IP', I_BOOKING_STATUS: data.I_BOOKING_STATUS, I_REMARKS: data.I_REMARKS, I_OTHER_PROJ_INFO: data.I_OTHER_PROJ_INFO, I_STATE: data.I_STATE, Token: 'MH3NPYK34J0KHDI' }
    if (this.customer_lead_form.valid) {
      this.submit_button = true;
      (<any>this.shared.client).Create_Customer_Lead(body_customer_lead_data).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          alert('Thank you.Your Form is Submitted Successfully.')
          location.reload();
        },
        err => console.log(err)
      );
    }
    else {
      alert('Please fill all the fields.')
    }
  }

  selectStateValue(event) {
    this.selected_state = event.value;
    let body_GET_CITY = { City: this.selected_state, Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).GET_CITY(body_GET_CITY).subscribe(

      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.GET_CITYResult;

        var result_json = JSON.parse(result)

        this.list_city = result_json.Table;


      },
      err => console.log(err)
    );
  }

  getAllState() {
    let body_Get_all_state = { Token: 'MH3NPYK34J0KHDI' };
    (<any>this.shared.client).Get_all_state(body_Get_all_state).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get_all_stateResult;

        var result_json = JSON.parse(result);

        this.all_state = result_json.Table;
        console.log(this.all_state);


      },
      err => console.log(err)
    );
  }

  getInterestedProj() {
    let body_Project_By_Bldrid = { I_BUILDER_ID: '510673', Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).Get_Project_By_Bldrid(body_Project_By_Bldrid).subscribe(
      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.Get_Project_By_BldridResult;
        // console.log(message2);

        var result_json = JSON.parse(result)
        console.log("object", result_json)

        this.list_interested_project = result_json.Table;


      },
      err => console.log(err)
    );

  }

  ExcelFileEvent($event) {
    if ($event.target.files[0]) {
      var file: File = $event.target.files[0];
      if (!this.validateFile(file)) {
        alert("Unsupported image format");
        return false;
      }

      if (file.size > 4294967296) {
        alert("Max. File size: 4GB");
        return false;
      }
      this.file = $event.target.files[0];
      console.log(this.file)
      this.file_name = this.file.name



    }
  }
  validateFile(file: File) {
    let extension = file.name.split('.').pop().toLowerCase();

    return this.AllowedFile.indexOf(extension) > -1;
  }
  // public files: NgxFileDropEntry[] = [];


  // dropped(files: NgxFileDropEntry[]) {
  //   this.files = files;
  //   for (const droppedFile of files) {


  //     if (droppedFile.fileEntry.isFile) {
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       this.fileEntry = true;
  //       fileEntry.file((file: File) => {
  //         this.filename = file.name
  //         console.log(this.filename);

  //         console.log(droppedFile.relativePath, file);


  //       });
  //     }
  //     else {

  //       const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //       console.log(droppedFile.relativePath, fileEntry);
  //       this.fileEntry = false;


  //     }
  //   }
  // }
}
  // http://pws.hdfc.com/Devport_dmz/Devport_Out_API.svc
  // https://pws.hdfc.com/Devport_dmz/Service1.svc