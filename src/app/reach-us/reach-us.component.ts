import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reach-us',
  templateUrl: './reach-us.component.html',
  styleUrls: ['./reach-us.component.css']
})
export class ReachUsComponent implements OnInit {
  reachus: FormGroup;

  constructor(private shared : SharedService,private singinfb: FormBuilder) { }

  ngOnInit(): void {
    this.shared.headerTitle('Reach Us');
    this.reachus = this.singinfb.group({
      'approval': ['', Validators.required],
      'campaign': ['', Validators.required],
      'subvention_scheme': ['', Validators.required],
      'disbursment_facility': ['', Validators.required],
      'home_loan': ['', Validators.required],
      'sales_executive': ['', Validators.required]



     
    })
  }
}