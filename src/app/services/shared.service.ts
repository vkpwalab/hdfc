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
  constructor( private ar: ActivatedRoute, private http: HttpClient) {
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

  uploadDoc(file_base64, doc_desc, doc_ext, proj_no, doc_code, remark, file_name){
    let body_acc_types = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                            <soapenv:Header/>
                            <soapenv:Body>
                              <tem:Save_Doc>
                                  <!--Optional:-->
                                  <tem:docbyte>${file_base64}</tem:docbyte>
                                  <!--Optional:-->
                                  <tem:doc_name>${doc_desc}</tem:doc_name>
                                  <!--Optional:-->
                                  <tem:EXTENSION>${doc_ext}</tem:EXTENSION>
                                  <!--Optional:-->
                                  <tem:I_PROJECT_NO>${proj_no}</tem:I_PROJECT_NO>
                                  <!--Optional:-->
                                  <tem:I_PHASENO></tem:I_PHASENO>
                                  <!--Optional:-->
                                  <tem:I_DOC_CODE>${doc_code}</tem:I_DOC_CODE>
                                  <!--Optional:-->
                                  <tem:I_DOC_DESC>${doc_desc}</tem:I_DOC_DESC>
                                  <!--Optional:-->
                                  <tem:I_DOC_PURPOSE>${remark}</tem:I_DOC_PURPOSE>
                                  <!--Optional:-->
                                  <tem:I_CREATEDBY>${this.builder_id}</tem:I_CREATEDBY>
                                  <!--Optional:-->
                                  <tem:I_FILENAME>${file_name}</tem:I_FILENAME>
                                  <!--Optional:-->
                                  <tem:I_DOC_URL></tem:I_DOC_URL>
                              </tem:Save_Doc>
                            </soapenv:Body>
                        </soapenv:Envelope>`;

      let soapaction = 'http://tempuri.org/IService1/Save_Doc';
      let result_tag = 'Save_DocResult';
      this.getData(soapaction, body_acc_types, result_tag).subscribe(
        (data) => {
          console.log(data);
        }
      );
  }
}
