import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import $ from 'jquery';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {

  constructor(private shared : SharedService) { }

  ngOnInit(): void {
    this.shared.headerTitle('List All Projects');
  }
  showFilter(id){
    if($('#filter'+id).is(':visible')){
      $('#filter'+id).hide();
    }else{
     $('#filter'+id).show();
    }
  }

}
