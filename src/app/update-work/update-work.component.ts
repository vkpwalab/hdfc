import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrls: ['./update-work.component.css']
})
export class UpdateWorkComponent implements OnInit {
  // show_progress:boolean;
  constructor(private shared: SharedService) {
    // this.show_progress=false;
   }

  ngOnInit(): void {
    this.shared.headerTitle('Project Progress');
  }
   showProgress(id){
     if($('#progress'+id).is(':visible')){
       $('#progress'+id).hide();
     }else{
      $('#progress'+id).show();
     }
   }
   showFilter(id){
    if($('#filter'+id).is(':visible')){
      $('#filter'+id).hide();
    }else{
     $('#filter'+id).show();
    }
  }
}
