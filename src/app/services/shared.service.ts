import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  client: Client;
  path: string;
  token: string;
  builder_id: string;
  api_path: string = environment.Baseurl;
  constructor(private soap: NgxSoapService, private ar: ActivatedRoute, private http: HttpClient) {
    this.soap.createClient('assets/hdfc-api.wsdl')
      .then(client => {
        client.addHttpHeader('Access-Control-Allow-Origin', '*');
        client.addHttpHeader('Access-Control-Allow-Headers', 'Content-type,append,delete,entries,foreach,get,has,keys,set,values,Authorization');
        client.addHttpHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
        console.log('Client', client);
        this.client = client;
      })
      .catch(err => console.log('Error', err));

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
}
