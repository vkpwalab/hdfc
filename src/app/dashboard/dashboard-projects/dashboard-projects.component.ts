import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import $ from 'jquery';
import { ISoapMethodResponse } from 'ngx-soap';
@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.css']
})
export class DashboardProjectsComponent implements OnInit {
  builders_details: any;

  constructor(private shared : SharedService) { }

  ngOnInit(): void {
    this.getTopProject();
    
  }
  
  getTopProject(){
    let body_builders_details = { i_builder_id: '510673', Token: 'MH3NPYK34J0KHDI' };
    console.log(body_builders_details)
    setTimeout(() => {
      (<any>this.shared.client).View_bldr_top_proj(body_builders_details).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.View_bldr_top_projResult;
          console.log(result);

          var result_json = JSON.parse(result)
          console.log("object", result_json)


          this.builders_details = result_json.Table;

         
        },
        err => console.log(err)
      );
    }, 1000);
  }
}
