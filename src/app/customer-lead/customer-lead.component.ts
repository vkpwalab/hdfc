import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormGroup, FormBuilder, Validators,FormControl ,NgForm} from '@angular/forms';



@Component({
  selector: 'app-customer-lead',
  templateUrl: './customer-lead.component.html',
  styleUrls: ['./customer-lead.component.css']
})


export class CustomerLeadComponent implements OnInit {
  select_project = new FormControl('', Validators.required);

  customer_lead_form: FormGroup;
  isSubmitted = false;
 
  uploadthroughexcel: FormGroup;
  constructor(private shared : ServiceService,private fb: FormBuilder) { }

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
   
  
  }
  postData(customer_lead_form:NgForm)  
  {  
    console.log(customer_lead_form.value);  
  }  
 
  // get state() {
  //   return this.customerlead.get('state');
  // }
  

}
