import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-project-distursement',
  templateUrl: './project-distursement.component.html',
  styleUrls: ['./project-distursement.component.css']
})
export class ProjectDistursementComponent implements OnInit {

  constructor(private shared : SharedService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Project Disbursement');
  }

}
