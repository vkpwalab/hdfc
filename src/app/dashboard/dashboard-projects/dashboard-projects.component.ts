import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import $ from 'jquery';
@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.css']
})
export class DashboardProjectsComponent implements OnInit {
  top_projects: any;
  builder_id: string;
  token: string;
  constructor(private shared: SharedService) { }

  ngOnInit(): void {
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    this.getTopProject();

  }

  getTopProject() {
    let body_government_link = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:View_bldr_top_proj>
                                        <!--Optional:-->
                                        <tem:i_builder_id>${this.builder_id}</tem:i_builder_id>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:View_bldr_top_proj>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/View_bldr_top_proj';
    let result_tag = 'View_bldr_top_projResult';
    this.shared.getData(soapaction, body_government_link, result_tag).subscribe(
      (data) => {
        this.top_projects = data.Table;

          for (let index = 0; index < this.top_projects.length; index++) {
            const element = this.top_projects[index];
            let lead_percent = (element.CONV_LEAD / element.TOTAL_LEAD) * 100;
            let lead_outof10 = Math.round((lead_percent / 100) * 10);

            for (let j = 1; j <= 10; j++) {
              if (j <= lead_outof10) {
                this.top_projects[index]['u' + j] = true;
              } else {
                this.top_projects[index]['u' + j] = false;
              }
            }
            this.top_projects[index]['disb_percent'] = (element.TOT_SANCTION / element.TOTAL_FUNDING) * 100;

          }

          setTimeout(() => {
            for (let index = 0; index < this.top_projects.length; index++) {
              $('#progress' + index).css('width', this.top_projects[index]['disb_percent'] + '%');
            }
          }, 1);
          console.log(this.top_projects);
      }
    );
  }
}
