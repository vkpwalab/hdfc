import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrls: ['./update-work.component.css']
})
export class UpdateWorkComponent implements OnInit {
  // show_progress:boolean;
  constructor() {
    // this.show_progress=false;
   }

  ngOnInit(): void {
  }
   showProgress(id){
     if($('#progress'+id).is(':visible')){
       $('#progress'+id).hide();
     }else{
      $('#progress'+id).show();
     }
   }
}
