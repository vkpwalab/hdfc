import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
 

  constructor(private shared : ServiceService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Project Overview');
  }
}
