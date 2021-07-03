import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-upload-docx',
  templateUrl: './upload-docx.component.html',
  styleUrls: ['./upload-docx.component.css']
})
export class UploadDocxComponent implements OnInit {
  files: NgxFileDropEntry[] = [];
  file: any;
  file_name: any = '';
  file_uploaded: boolean;
  file_ext: any;
  file_size: string;
  project_id: string;
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
  doc_uploaded: boolean;
  @Input() draft_data: any;
  constructor(private shared: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.builder_id = localStorage.getItem("builder_id");
    this.token = localStorage.getItem("auth-token")
    this.doc_ext_image = {
      pdf: './assets/images/pdf.png',
      xls: './assets/images/excel_icon.png',
      xlsx: './assets/images/excel_icon.png',
      csv: './assets/images/excel_icon.png',
      doc: './assets/images/word_icon.png',
      docx: './assets/images/word_icon.png',
      other: './assets/images/word_icon.png',
      png: './assets/images/png_icon.png',
      jpeg: './assets/images/png_icon.png',
      jpg: './assets/images/png_icon.png',
    }

    this.doc_ext_color = {
      pdf: 'red-box',
      xls: 'green-box',
      xlsx: 'green-box',
      csv: 'green-box',
      doc: 'blue-box',
      docx: 'blue-box',
      other: 'blue-box',
      png: 'red-box',
      jpeg: 'red-box',
      jpg: 'red-box',
    }

    this.upload_form = this.fb.group({
      'message': [''],
      'doc_type': ['', [Validators.required]],
    });

    this.shared.project_id.subscribe(
      (res) => {
        this.project_id = res;
      }
    )

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
                  this.doc_uploaded = true;
                  console.log(doc_data)
                  this.removeFile();
                  this.upload_form.reset();
                }
              )
            }
          }
        )
      }
    } else {

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
          this.file_color = this.doc_ext_color[ext] ? this.doc_ext_color[ext] : this.doc_ext_color['other'];
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

  saveProject() {
    if(this.doc_uploaded){
      let body_submit_project = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:project_push_to_lms>
                                        <!--Optional:-->
                                        <tem:i_project_id>${this.project_id}</tem:i_project_id>
                                        <!--Optional:-->
                                        <tem:i_user>${this.builder_id}</tem:i_user>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:project_push_to_lms>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;
  
      let soapaction = 'http://tempuri.org/IService1/project_push_to_lms';
      let result_tag = 'project_push_to_lmsResult';
      this.shared.getData(soapaction, body_submit_project, result_tag).subscribe(
        (data) => {
          this.removeDraft();
          console.log(data);
          //location.reload();
        }
      );
    }
  }

  removeDraft() {
    if(this.draft_data){
      let body_delete_draft = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                    <soapenv:Header/>
                                    <soapenv:Body>
                                      <tem:UPD_DRAFT_PROJECT>
                                          <!--Optional:-->
                                          <tem:I_DRAFT_ID>${this.draft_data.DRAFT_ID}</tem:I_DRAFT_ID>
                                          <!--Optional:-->
                                          <tem:Token>${this.token}</tem:Token>
                                      </tem:UPD_DRAFT_PROJECT>
                                    </soapenv:Body>
                                </soapenv:Envelope>`;
  
      let soapaction = 'http://tempuri.org/IService1/UPD_DRAFT_PROJECT';
      let result_tag = 'UPD_DRAFT_PROJECTResult';
      this.shared.getData(soapaction, body_delete_draft, result_tag).subscribe(
        (data) => {
          alert('Project created successfully');
          console.log(data);
          //location.reload();
        }
      );
    }else{
      alert('Project created successfully');
      //location.reload();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('value changed', this.draft_data);
  }
}