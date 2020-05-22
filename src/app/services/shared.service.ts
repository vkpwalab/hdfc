import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  client: Client;
  path: string;
  
  constructor(private soap: NgxSoapService,private ar:ActivatedRoute) { 
    this.soap.createClient('assets/hdfc-api.wsdl')
    .then(client => {
      // client.addHttpHeader('Access-Control-Allow-Origin', '*');
      // client.addHttpHeader('Access-Control-Allow-Headers', 'append,delete,entries,foreach,get,has,keys,set,values,Authorization');
      // client.addHttpHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
      console.log('Client', client);
      this.client = client;
    })
    .catch(err => console.log('Error', err))
  }

  header_title = new BehaviorSubject('Dashboard')
  headerTitle(v) {
    this.header_title.next(v)
  }
  peoplePage=new BehaviorSubject('People')
  peoplePageProAss(v)
  {
    this.peoplePage.next(v)
  }
  // mypath=new BehaviorSubject('')
  // myOverview(data){
  //   this.mypath.next(data) 
  // }
  // mypath1=new BehaviorSubject('')
  // myOverview1(data){
  //   this.mypath1.next(data) 
  // }

  project_id = new BehaviorSubject('')
  projectId(v) {
    this.project_id.next(v)
  }

  isMobile() {
    {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  }
}
