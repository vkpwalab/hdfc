import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-project-distursement',
  templateUrl: './project-distursement.component.html',
  styleUrls: ['./project-distursement.component.css']
})
export class ProjectDistursementComponent implements OnInit {

  constructor(private shared : ServiceService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Project Disbursement');
  }

}
