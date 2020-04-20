import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-customer-lead',
  templateUrl: './customer-lead.component.html',
  styleUrls: ['./customer-lead.component.css']
})


export class CustomerLeadComponent implements OnInit {
  customerlead: FormGroup;
  isSubmitted = false;
  signup: FormGroup;
  constructor(private shared : ServiceService,private singinfb: FormBuilder) { }

  ngOnInit(): void {
    this.shared.headerTitle('Submit Customer Lead');
    this.customerlead = this.singinfb.group({
      'cname': ['', Validators.required],
      'mobile': ['', Validators.required],
      'email': ['', Validators.required],
      'project': ['', Validators.required],
      'remark': ['', Validators.required],
      'state': ['', Validators.required],
      'myfile': ['', Validators.required],

     
    })
    // this.signup = this.singinfb.group({
     
    // });
  
  }
 
  get state() {
    return this.customerlead.get('state');
  }
  

}
