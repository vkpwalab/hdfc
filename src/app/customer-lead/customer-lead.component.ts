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
  constructor(private shared: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.shared.headerTitle('Submit Customer Lead');
    this.customer_lead_form = this.fb.group({
      'cname': ['', Validators.required],
      'mobile': ['', Validators.required],
      'email': ['', Validators.required],
      'project': ['', Validators.required],
      'remark': ['', Validators.required],
      'state': ['', Validators.required],
      'myfile': ['', Validators.required],
      'city': ['', Validators.required],
      'bookingstatus': ['', Validators.required],
      'projectin': ['', Validators.required],
      'myprofile': ['', Validators.required]
    })

    let body = { Token: 'MH3NPYK34J0KHDI' };

    setTimeout(() => {
      (<any>this.shared.client).Get_all_state(body).subscribe(
        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let message = res.result.Get_all_stateResult;
          console.log(message);
        

        },
        err => console.log(err)
      );
    }, 4000);

  }
  postData(customer_lead_form) {
    console.log(customer_lead_form.value);
  }
  public files: NgxFileDropEntry[] = [];


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry = true;
        fileEntry.file((file: File) => {
          this.filename = file.name
          console.log(this.filename);
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          // $("#progress1").show();

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      }
      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
        this.fileEntry = false;

        // $("#progress1").hide();

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
