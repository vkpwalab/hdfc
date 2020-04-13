import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';



@Component({
  selector: 'app-customer-lead',
  templateUrl: './customer-lead.component.html',
  styleUrls: ['./customer-lead.component.css']
})


export class CustomerLeadComponent implements OnInit {
 
  constructor(private shared : ServiceService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Submit Customer Lead');
  }

}
