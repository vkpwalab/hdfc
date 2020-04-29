import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-assistance',
  templateUrl: './project-assistance.component.html',
  styleUrls: ['./project-assistance.component.css']
})
export class ProjectAssistanceComponent implements OnInit {
  project_assistance_form: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.project_assistance_form = this.fb.group({
      'approval': ['', Validators.required],
      'campaign': ['', Validators.required],
      'subvention_scheme': ['', Validators.required],
      'disbursment_facility': ['', Validators.required],
      'home_loan': ['', Validators.required],
      'sales_executive': ['', Validators.required]



     
    })
  }

}
