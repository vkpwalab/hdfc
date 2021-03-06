import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import $ from "jquery";
import { ModalComponentComponent } from 'src/app/modal-component/modal-component.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-builders-bank',
  templateUrl: './builders-bank.component.html',
  styleUrls: ['./builders-bank.component.css']
})
export class BuildersBankComponent implements OnInit {

  dynamic_forms: any = [];
  builder_id: string;
  token: string;
  bank_names: any = [];
  account_types: any = [];
  project_id: string;
  file: any = [];
  file_name: any = [];
  file_uploaded: any = [];
  payment_for: any;
  file_base64: string | ArrayBuffer;
  file_ext: any = [];
  bank_added: boolean;
  constructor(private shared: SharedService, private fb: FormBuilder, public modalService:NgbModal) { }

  ngOnInit(): void {
    this.builder_id = localStorage.getItem("builder_id");
    this.token = localStorage.getItem("auth-token")

    this.dynamic_forms[0] = this.fb.group({
      'payee_name': ['', Validators.required],
      'bank_name': ['', Validators.required],
      'bank_acc_no': ['', Validators.required],
      'account_type': ['', Validators.required],
      'ifcs_code': ['', Validators.required],
      'bank_branch': ['', Validators.required],
      'payment_for': ['', Validators.required],
      'rera_coll_account': ['', Validators.required],
    });
    this.file_name[0] = '';

    this.shared.project_id.subscribe(
      (res) => {
        this.project_id = res;
      }
    )

    console.log(this.dynamic_forms);
    this.getBankNames();
    this.getAccountTypes();
    this.getPaymentFor();
  }

  getBankNames() {
    let body_bank_names = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get_MASTER_DATA>
                                        <!--Optional:-->
                                        <tem:I_CD_VAL>INSTITUTION_NAME</tem:I_CD_VAL>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get_MASTER_DATA>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_MASTER_DATA';
    let result_tag = 'Get_MASTER_DATAResult';
    this.shared.getData(soapaction, body_bank_names, result_tag).subscribe(
      (data) => {
        this.bank_names = data.Table;
        console.log(this.bank_names);
      }
    );
  }

  getAccountTypes() {
    let body_acc_types = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get_MASTER_DATA>
                                        <!--Optional:-->
                                        <tem:I_CD_VAL>ACCOUNT_TYPE</tem:I_CD_VAL>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get_MASTER_DATA>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_MASTER_DATA';
    let result_tag = 'Get_MASTER_DATAResult';
    this.shared.getData(soapaction, body_acc_types, result_tag).subscribe(
      (data) => {
        this.account_types = data.Table;
        console.log(this.account_types);
      }
    );
  }

  getPaymentFor() {
    let body_acc_types = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:Get_MASTER_DATA>
                                        <!--Optional:-->
                                        <tem:I_CD_VAL>PAYMENT_FOR</tem:I_CD_VAL>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:Get_MASTER_DATA>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Get_MASTER_DATA';
    let result_tag = 'Get_MASTER_DATAResult';
    this.shared.getData(soapaction, body_acc_types, result_tag).subscribe(
      (data) => {
        this.payment_for = data.Table;
        console.log(this.payment_for);
      }
    );
  }

  addBank() {
    let fd = this.fb.group({
      'payee_name': ['', Validators.required],
      'bank_name': ['', Validators.required],
      'bank_acc_no': ['', Validators.required],
      'account_type': ['', Validators.required],
      'ifcs_code': ['', Validators.required],
      'bank_branch': ['', Validators.required],
      'payment_for': ['', Validators.required],
      'rera_coll_account': ['', Validators.required],
    });

    this.dynamic_forms.push(fd);
    this.file_name[this.file_name.length] = '';
  }

  removeBank(index) {
    this.dynamic_forms.splice(index, 1);
  }

  uploadBankFile(data,index) {
    console.log(data)
    console.log(this.file_uploaded[index]);
    if (this.file_uploaded[index] == 'Y') {
      this.shared.uploadDoc(this.file[index], this.file_ext[index], this.project_id, 'CHQ', this.file_name[index]).subscribe(
        (res) => {
          if (res == 'OK') {
            this.shared.updateDocDetail(this.project_id, this.file_name[index], this.file_ext[index], 'CHQ', '').subscribe(
              (doc_data) => {
                this.updateBankDetail(data, doc_data.o_srno,index);
                console.log(doc_data)
              }
            )
          }
        }
      )
    }else{
      this.openModal("Please upload document");
    }

  }

  updateBankDetail(data, srno, index) {
    let body_acc_types = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                            <soapenv:Header/>
                            <soapenv:Body>
                              <tem:ins_devport_project_bank>
                                  <!--Optional:-->
                                  <tem:i_sr_no>${srno}</tem:i_sr_no>
                                  <!--Optional:-->
                                  <tem:i_project_id>${this.project_id}</tem:i_project_id>
                                  <!--Optional:-->
                                  <tem:i_payee_name>${data.payee_name}</tem:i_payee_name>
                                  <!--Optional:-->
                                  <tem:i_bank_id>${data.bank_name}</tem:i_bank_id>
                                  <!--Optional:-->
                                  <tem:i_branch>${data.bank_branch}</tem:i_branch>
                                  <!--Optional:-->
                                  <tem:i_bank_account_no>${data.bank_acc_no}</tem:i_bank_account_no>
                                  <!--Optional:-->
                                  <tem:i_ifsc_code>${data.ifcs_code}</tem:i_ifsc_code>
                                  <!--Optional:-->
                                  <tem:i_account_type>${data.account_type}</tem:i_account_type>
                                  <!--Optional:-->
                                  <tem:i_payment_for>${data.payment_for}</tem:i_payment_for>
                                  <!--Optional:-->
                                  <tem:i_rera_collection_account>${data.rera_coll_account}</tem:i_rera_collection_account>
                                  <!--Optional:-->
                                  <tem:i_upld_cancel_chq_yn>${this.file_uploaded[index]}</tem:i_upld_cancel_chq_yn>
                                  <!--Optional:-->
                                  <tem:i_remarks>?</tem:i_remarks>
                                  <!--Optional:-->
                                  <tem:i_user_id>${this.builder_id}</tem:i_user_id>
                                  <!--Optional:-->
                                  <tem:i_doc_upld_srno>${srno}</tem:i_doc_upld_srno>
                                  <!--Optional:-->
                                  <tem:Token>${this.token}</tem:Token>
                              </tem:ins_devport_project_bank>
                            </soapenv:Body>
                        </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/ins_devport_project_bank';
    let result_tag = 'ins_devport_project_bankResult';
    this.shared.getData(soapaction, body_acc_types, result_tag).subscribe(
      (data) => {
        console.log(data);
        this.bank_added = true;
        
        alert('Bank detail updated');
      }
    );
  }

  uploadFileEvent($event,index) {
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
      console.log(this.file_uploaded);
    }
  }

  next(){
    if(this.bank_added){
      $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
      $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');
      this.shared.sharedTab4.tab = false;
      
    }else{
      this.openModal("Add atleast one bank detail")
      //alert()
    }
  }

  openModal(name) {
    const str = name;
    const modalRef = this.modalService.open(ModalComponentComponent,{size:'sm'});
    modalRef.componentInstance.name = str;

  }
}
