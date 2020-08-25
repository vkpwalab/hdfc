import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  path: string;
  token: string;
  builder_id: string;
  api_path: string = environment.Baseurl;
  constructor(private ar: ActivatedRoute, private http: HttpClient) {
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
  }

  header_title = new BehaviorSubject('Dashboard')
  headerTitle(v) {
    this.header_title.next(v)
  }
  peoplePage = new BehaviorSubject('People')
  peoplePageProAss(v) {
    this.peoplePage.next(v)
  }

  project_id = new BehaviorSubject('')
  projectId(v) {
    this.project_id.next(v)   
  }
  sharedTab = {"tab" :true}
  sharedTab1 = {"tab" :true}
  sharedTab2 = {"tab" :true}
  sharedTab3 = {"tab" :true}
  sharedTab4 = {"tab" :true}
  isMobile() {
    {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  }

  getData(soapaction, body, result_tag) {
    const header = new HttpHeaders({
      'Content-Type': 'text/xml',
      'soapaction': soapaction
    })

    return this.http.post(this.api_path, body, { headers: header, responseType: "text" }).pipe(map((res: any) => {
      // console.log(res);
      const parser = new DOMParser();
      let xml = parser.parseFromString(res, 'text/xml');
      let xml_body = xml.getElementsByTagName(result_tag)[0].childNodes[0].nodeValue;
      let json_res = JSON.parse(xml_body);
      return json_res;
    }))

  }

  uploadDoc(file_base64, doc_ext, proj_no, doc_code, file_name) {

    let fd = new FormData;
    fd.append('78676798', file_base64);

    return this.http.post('https://pws.hdfc.com/Upload_Devport_Doc_Dmz/API/UploadDoc?I_Project_ID=' + 85536 + '&I_Builder_ID=' + this.builder_id + '&I_DOC_CODE=' + doc_code + '&i_Document_Name=' + file_name + '&i_Document_Type=' + doc_ext + '&i_Login_Id=' + this.builder_id, fd).pipe(map(
      (res) => {
        return res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    ))
  }

  updateDocDetail(proj_no, file_name, file_ext, doc_code, remark) {
    let body_ins_upld_doc = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                           <soapenv:Header/>
                           <soapenv:Body>
                               <tem:Ins_Upld_Document_NEW>
                                 <!--Optional:-->
                                 <tem:i_Login_Id>${this.builder_id}</tem:i_Login_Id>
                                 <!--Optional:-->
                                 <tem:I_Project_ID>85536</tem:I_Project_ID>
                                 <!--Optional:-->
                                 <tem:I_Builder_ID>${this.builder_id}</tem:I_Builder_ID>
                                 <!--Optional:-->
                                 <tem:i_file_no></tem:i_file_no>
                                 <!--Optional:-->
                                 <tem:I_DOC_CODE>${doc_code}</tem:I_DOC_CODE>
                                 <!--Optional:-->
                                 <tem:i_Document_Name>${file_name}</tem:i_Document_Name>
                                 <!--Optional:-->
                                 <tem:i_Document_Type>${file_ext}</tem:i_Document_Type>
                                 <!--Optional:-->
                                 <tem:i_remark>${remark}</tem:i_remark>
                                 <!--Optional:-->
                                 <tem:i_key1></tem:i_key1>
                                 <!--Optional:-->
                                 <tem:i_key2></tem:i_key2>
                                 <!--Optional:-->
                                 <tem:i_user>${this.builder_id}</tem:i_user>
                               </tem:Ins_Upld_Document_NEW>
                           </soapenv:Body>
                         </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Ins_Upld_Document_NEW';
    let result_tag = 'Ins_Upld_Document_NEWResult';

    const header = new HttpHeaders({
      'Content-Type': 'text/xml',
      'soapaction': soapaction
    })

    return this.http.post(this.api_path, body_ins_upld_doc, { headers: header, responseType: "text" }).pipe(map((res: any) => {
      // console.log(res);
      const parser = new DOMParser();
      let xml = parser.parseFromString(res, 'text/xml');
      let xml_body = xml.getElementsByTagName(result_tag)[0].childNodes[0].nodeValue;
      let json_res = JSON.parse(xml_body);
      return json_res;
    }));
  }
}
