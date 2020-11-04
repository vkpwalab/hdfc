import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import $ from 'jquery';
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  @Input() project_id: any;
  token: string;
  leads: any;
  search_text: string;
  search_number: string;
  constructor( private shared:SharedService) { }

  ngOnInit(): void {
    this.token = 'MH3NPYK34J0KHDI';
    this.getProjectLead();
  }

  showFilter(id) {
    if ($('#filter' + id).is(':visible')) {
      $('#filter' + id).hide();
    } else {
      $('#filter' + id).show();
    }
  }

  getProjectLead() {
    let body_Building_List = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:GET_PROJ_LEAD_CLIENT>
                                      <!--Optional:-->
                                      <tem:i_project_id>574943</tem:i_project_id>
                                      <!--Optional:-->
                                      <tem:I_TYPE>?</tem:I_TYPE>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                  </tem:GET_PROJ_LEAD_CLIENT>
                                </soapenv:Body>
                            </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_PROJ_LEAD_CLIENT';
    let result_tag = 'GET_PROJ_LEAD_CLIENTResult';
    this.shared.getData(soapaction, body_Building_List, result_tag).subscribe(
      (data) => {
        this.leads = data.Table;
        console.log(this.leads);
      }
    );
  }

}
