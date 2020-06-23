import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raise-demand',
  templateUrl: './raise-demand.component.html',
  styleUrls: ['./raise-demand.component.css']
})
export class RaiseDemandComponent implements OnInit {
  project_id: any;
  building_id: any;
  demand_letter: any = [];
  builder_id: string;
  token: string;

  constructor(private shared : SharedService, private activatedRoute: ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.shared.headerTitle('Raise Demand Letter');
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    this.activatedRoute.params.subscribe(params => {
      if (params['pid']) {
        this.project_id = params['pid'];
        this.building_id = params['bid'];
      } else {
        this.route.navigate(['dashboard']);
      }
    });

    this.getRaiseDemandLetter();
  }

  getRaiseDemandLetter(){
    let body_raise_demand_letter = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:get_file_list>
                                        <!--Optional:-->
                                        <tem:i_project_id>47091</tem:i_project_id>
                                        <!--Optional:-->
                                        <tem:i_proj_bldg_no>96354</tem:i_proj_bldg_no>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:get_file_list>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/get_file_list';
    let result_tag = 'get_file_listResult';
    this.shared.getData(soapaction, body_raise_demand_letter, result_tag).subscribe(
      (data) => {
        this.demand_letter = data.Table;
        console.log(this.demand_letter);
      }
    );
  }
}
