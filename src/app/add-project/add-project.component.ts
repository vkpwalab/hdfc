import { Component, OnInit } from '@angular/core';
import $ from 'jquery';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {


  constructor() { }

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
