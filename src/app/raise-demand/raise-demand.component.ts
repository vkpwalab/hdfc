import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-raise-demand',
  templateUrl: './raise-demand.component.html',
  styleUrls: ['./raise-demand.component.css']
})
export class RaiseDemandComponent implements OnInit {

  constructor(private shared : SharedService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Raise Demand Letter');
  }

}
