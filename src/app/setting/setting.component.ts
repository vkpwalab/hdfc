import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import $ from 'jquery';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private shared : SharedService) { }

  ngOnInit(): void {
    this.shared.headerTitle('Settings');
    $('.card-header').click(function() { 
      $(this).find('i').toggleClass('fas fa-plus fas fa-minus'); 
  }); 
  }


}
