import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  client: Client;
  constructor(private soap: NgxSoapService) { 
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

  isMobile() {
    {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  }
}
