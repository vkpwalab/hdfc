import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-respond-to-queries',
  templateUrl: './respond-to-queries.component.html',
  styleUrls: ['./respond-to-queries.component.css']
})
export class RespondToQueriesComponent implements OnInit {

  constructor(private shared : ServiceService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Respond To Queires');

  }

}
