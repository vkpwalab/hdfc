import { Component, OnInit, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-of-documents',
  templateUrl: './list-of-documents.component.html',
  styleUrls: ['./list-of-documents.component.css']
})
export class ListOfDocumentsComponent implements OnInit {
  @Input() project_id: any;
  files: NgxFileDropEntry[] = [];
  file: any;
  file_name: any = '';
  file_uploaded: boolean;
  file_ext: any;
  file_size: string;
  uploaded_doc: any = [];
  doc_ext_image: any = {};
  builder_detail: any;
  branch_no: any;
  builder_id: string;
  token: string;
  document_list: any;
  file_icon: any;
  file_color: any;
  doc_ext_color: any;
  upload_form: FormGroup;
  all_doc: any;
  constructor(private shared:SharedService, private http:HttpClient, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    this.doc_ext_image = {
      pdf: './assets/images/pdf.png',
      xls: './assets/images/excel icon.png',
      xlsx: './assets/images/excel icon.png',
      csv: './assets/images/excel icon.png',
      doc: './assets/images/word icon.png',
      docx: './assets/images/word icon.png',
      other: './assets/images/word icon.png',
    }

    this.doc_ext_color = {
      pdf: 'red-box',
      xls: 'green-box',
      xlsx: 'green-box',
      csv: 'green-box',
      doc: 'blue-box',
      docx: 'blue-box',
      other:'blue-box'
    }
    this.upload_form = this.fb.group({
      'message': [''],
      'doc_type': ['',[Validators.required]],
    });
    this.getBuilersDetails();
    this.getAllDoc();
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
        this.getDocumentType();
      }
    );
  }

  getDocumentType() {
    let body_document_code = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:Get_Doc_Code>
                                      <!--Optional:-->
                                      <tem:branch>${this.branch_no}</tem:branch>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                  </tem:Get_Doc_Code>
                                </soapenv:Body>
                            </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_Doc_Code';
    let result_tag = 'Get_Doc_CodeResult';
    this.shared.getData(soapaction, body_document_code, result_tag).subscribe(
      (data) => {
        this.document_list = data.Table;
      }
    );
  }
  
  sendResponse(data) {
    if (this.upload_form.valid) {
      if (this.file_uploaded) {
        this.shared.uploadDoc(this.file, this.file_ext, this.project_id, data.doc_type, this.file_name).subscribe(
          (res) => {
            if (res == 'OK') {
              this.shared.updateDocDetail(this.project_id, this.file_name, this.file_ext, data.doc_type, data.message).subscribe(
                (doc_data) => {
         
                  let doc = {
                    file_name: this.file_name,
                    file_size: this.file_size,
                    file_img: this.file_icon,
                    file_color: this.file_color
                  }
                  this.uploaded_doc.push(doc);
                  console.log(doc_data)
                  this.removeFile();
                  this.upload_form.reset();
                }
              )
            }
          }
        )
      }
    }else{

    }
  }

  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.file = file;
          this.file_name = this.file.name.split('.')[0]
          this.file_uploaded = true;
          this.file_ext = this.file.name.split('.').pop();
          this.file_size = (this.file.size / (1024 * 1024)).toFixed(2);

          let ext = this.file_ext.toLowerCase();
          this.file_icon = this.doc_ext_image[ext] ? this.doc_ext_image[ext] : this.doc_ext_image['other'];
          this.file_color = this.doc_ext_color[ext] ? this.doc_ext_color[ext] : this.doc_ext_color['other'] ;
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  removeFile() {
    this.file = '';
    this.file_name = '';
    this.file_uploaded = false;
    this.file_ext = '';
    this.file_size = '';
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
        this.all_doc = data.Table;
        console.log(this.all_doc);
        this.all_doc.forEach(element => {   
          let doc = {
            file_name: element.UPLOAD_FILE_NAME,
            file_size: '0.00',
            file_img: this.doc_ext_image[element.TYPE_OF_DOC],
            file_color: this.doc_ext_color[element.TYPE_OF_DOC]
          }
          this.uploaded_doc.push(doc);
        });
      }
    );
  }

}
