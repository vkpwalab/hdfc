import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
 
  construction_stage1 = new FormControl('', Validators.required);
  construction_stage2 = new FormControl('', Validators.required);
  construction_stage3 = new FormControl('', Validators.required);
  slab_complete1 = new FormControl('', Validators.required);
  slab_complete2 = new FormControl('', Validators.required);
  slab_complete3 = new FormControl('', Validators.required);
  remark1 = new FormControl('', Validators.required);
  remark2 = new FormControl('', Validators.required);
  remark3= new FormControl('', Validators.required);
  calendar1 = new FormControl('',Validators.required);
  calendar2 = new FormControl('',Validators.required);
  calendar3 = new FormControl('',Validators.required);
  
  
  constructor(private shared : ServiceService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Project Overview');
  }
}
