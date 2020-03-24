import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-raise-demand',
  templateUrl: './raise-demand.component.html',
  styleUrls: ['./raise-demand.component.css']
})
export class RaiseDemandComponent implements OnInit {

  constructor(private shared : ServiceService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Raise Demand');
  }

}
