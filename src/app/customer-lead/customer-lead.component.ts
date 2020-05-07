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
  select_project = new FormControl('', Validators.required);
  fileEntry: boolean = false
  customer_lead_form: FormGroup;
  isSubmitted = false;
  uploadthroughexcel: FormGroup;
  filename: string;
  object_get_all_state: any;
  object_get_city: any;
  state_name: any[];
  city: any;
  object_interested_project: any;
  createdby: any;
  updatedby: any;
  // projectid: any;
  tokenid: any;
  project_name: any;
  ans: number;
  ans2;
  select_values_of_state: any;
  order: any;
  state_name1: any;
  submit_button: boolean = false;

  constructor(private shared: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.selectStateValue();
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
      'I_STATE': ['', Validators.required],
      'myfile': ['', Validators.required],
      'myprofile': ['', Validators.required]
    })

    let body_Get_all_state = { Token: 'MH3NPYK34J0KHDI' }
    let body_Project_By_Bldrid = { I_BUILDER_ID: '510673', Token: 'MH3NPYK34J0KHDI' }


    // for get all state //
    setTimeout(() => {

      (<any>this.shared.client).Get_all_state(body_Get_all_state).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let message_Get_all_state = res.result.Get_all_stateResult;
          // console.log(message);

          var obj1 = JSON.parse(message_Get_all_state)
          // console.log("object", obj1)

          this.object_get_all_state = obj1.Table;
          console.log(this.object_get_all_state);


        },
        err => console.log(err)
      );
    }, 1000);
    // for get all state //


    // for get project name //

    setTimeout(() => {
      (<any>this.shared.client).Get_Project_By_Bldrid(body_Project_By_Bldrid).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let message_body_Project_By_Bldrid = res.result.Get_Project_By_BldridResult;
          // console.log(message2);

          var obj1 = JSON.parse(message_body_Project_By_Bldrid)
          console.log("object", obj1)

          this.object_interested_project = obj1.Table;


        },
        err => console.log(err)
      );
    }, 4000);

    // for get project name //


  }

  // Post Data //

  submitForm(data) {

    let body_customer_lead_data = { I_Cust_Name: data.I_Cust_Name, I_Cust_Email: data.I_Cust_Email, I_Cust_Mobile: data.I_Cust_Mobile, I_CITY: data.I_CITY, I_IP: "data.I_IP", I_BOOKING_STATUS: data.I_BOOKING_STATUS, I_REMARKS: data.I_REMARKS, I_OTHER_PROJ_INFO: data.I_OTHER_PROJ_INFO, I_STATE: data.I_STATE, Token: 'MH3NPYK34J0KHDI' }
    console.log(body_customer_lead_data)
    console.log(data);
    setTimeout(() => {
      if (this.customer_lead_form.valid) {
        this.submit_button = true;
        (<any>this.shared.client).Create_Customer_Lead(body_customer_lead_data).subscribe(
          (res: ISoapMethodResponse) => {
            console.log('method response', res);
            let xmlResponse = res.xml;
            alert('Thank you.Your Form is Submitted Successfully.')
            location.reload();

            // let message = res.result.Create_Customer_LeadResult;
          },
          err => console.log(err)
        );
      }
    }, 4000);

  }

// Post Data //


selectStateValue() {

    console.log(this.select_values_of_state)
   

    let body_GET_CITY = { City: this.select_values_of_state, Token: 'MH3NPYK34J0KHDI' }
    console.log(body_GET_CITY)
    setTimeout(() => {
      (<any>this.shared.client).GET_CITY(body_GET_CITY).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let message_GET_CITY = res.result.GET_CITYResult;
          console.log(message_GET_CITY);

          var obj2 = JSON.parse(message_GET_CITY)
          console.log("object", obj2)

          this.object_get_city = obj2.Table;
          console.log(this.object_get_city)
         
          
        },
        err => console.log(err)
      );
    }, 4000);
  }


  public files: NgxFileDropEntry[] = [];


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {


      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry = true;
        fileEntry.file((file: File) => {
          this.filename = file.name
          console.log(this.filename);

          console.log(droppedFile.relativePath, file);


        });
      }
      else {

        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
        this.fileEntry = false;


      }
    }
  }

  // get state() {
  //   return this.customerlead.get('state');
  // }



  soapCall() {
    const xmlhttp = new XMLHttpRequest();

    // The following variable contains the xml SOAP request.
    const sr =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
           <tem:Get_all_state>
              <!--Optional:-->
              <tem:Token>MH3NPYK34J0KHDI</tem:Token>
           </tem:Get_all_state>
        </soapenv:Body>
     </soapenv:Envelope>`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const xml = xmlhttp.responseXML;
          console.log(xml);
          // Here I'm getting the value contained by the <return> node.
          // const response_number = parseInt(xml.getElementsByTagName('return')[0].childNodes[0].nodeValue);
          // Print result square number.
          // console.log(response_number);
        }
      }
    }
    // Send the POST request.
    // xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    // xmlhttp.responseType = 'document';
    xmlhttp.open('GET', 'https://pws.hdfc.com/Devport_dmz/Devport_Out_API.svc?singleWsdl', true);
    xmlhttp.send(sr);
  }
}
