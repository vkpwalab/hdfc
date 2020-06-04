import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Router } from '@angular/router';
import { ISoapMethodResponse } from 'ngx-soap';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard-loan',
  templateUrl: './dashboard-loan.component.html',
  styleUrls: ['./dashboard-loan.component.css']
})
export class DashboardLoanComponent implements OnInit {
  array_project_name: any = [];
  array_tot_sanction: any = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {

          display: true
        }
      }],
      yAxes: [{
        gridLines: {

          display: true
        },
        ticks: { min: 0, max: 5 }
      }]
    },
    legend: {
      display: false,

    },



  };

  // public barChartLabels: Label[] = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5', 'Project6', 'Project7'];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [

    // { data: [250, 400, 500, 600, 700, 800, 680], label: 'Series A' }
    {
      data: [],

      backgroundColor: [
        'rgb(64,151,255)',
        'rgb(64,151,255)',
        'rgb(64,151,255)',
        'rgb(64,151,255)',
        'rgb(64,151,255)',
        'rgb(64,151,255)',
        'rgb(64,151,255)'

      ],
      hoverBackgroundColor: [
        'rgb(64,151,255)',
        'rgb(64,151,255)',
        'rgb(64,151,255)',
        'rgb(64,151,255)',
        'rgb(64,151,255)',
        'rgb(64,151,255)',
        'rgb(64,151,255)'
      ],
      barThickness: 20,
      // hoverBorderWidth: 20,
      label: "Loan Amount"


    },

  ];

  texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
  government_link: any;
  news: any;
  graph_details: any = [];
  builder_id: string;
  token: string;
  constructor(public router: Router, private shared: SharedService) { }

  ngOnInit(): void {
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';
    this.getGovernmentLink()
    this.getNews();
    this.getTotalLoan('WEEK');

  }



  getGovernmentLink() {
    let body_government_link = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:GET_LINK_DETAILS>
                                        <!--Optional:-->
                                        <tem:i_builder_id>466073</tem:i_builder_id>
                                        <!--Optional:-->
                                        <tem:I_LINK_TYPE>GL</tem:I_LINK_TYPE>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:GET_LINK_DETAILS>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_LINK_DETAILS';
    let result_tag = 'GET_LINK_DETAILSResult';
    this.shared.getData(soapaction, body_government_link, result_tag).subscribe(
      (data) => {
        this.government_link = data.Table;
      }
    );

  }
  getNews() {
    let body_government_link = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:GET_LINK_DETAILS>
                                        <!--Optional:-->
                                        <tem:i_builder_id>466073</tem:i_builder_id>
                                        <!--Optional:-->
                                        <tem:I_LINK_TYPE>NA</tem:I_LINK_TYPE>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:GET_LINK_DETAILS>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_LINK_DETAILS';
    let result_tag = 'GET_LINK_DETAILSResult';
    this.shared.getData(soapaction, body_government_link, result_tag).subscribe(
      (data) => {
        this.news = data.Table;
      }
    );
  }

  getTotalLoan(type) {
    let body_total_loan = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                              <soapenv:Header/>
                              <soapenv:Body>
                                <tem:GET_PROJECT_MIS>
                                    <!--Optional:-->
                                    <tem:i_builder_id>466073</tem:i_builder_id>
                                    <!--Optional:-->
                                    <tem:I_FREQ>${type}</tem:I_FREQ>
                                    <!--Optional:-->
                                    <tem:Token>${this.token}</tem:Token>
                                </tem:GET_PROJECT_MIS>
                              </soapenv:Body>
                          </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_PROJECT_MIS';
    let result_tag = 'GET_PROJECT_MISResult';
    this.shared.getData(soapaction, body_total_loan, result_tag).subscribe(
      (data) => {
        let loans = data.Table;
        console.log(loans)
        this.barChartLabels = [];
        this.barChartData[0].data = [];
        let graph_data = [];
        loans.forEach(element => {
          this.barChartLabels.push(element.PROJECT_NAME);
          graph_data.push(element.TOT_SANCTION);
        });

        this.barChartData[0].data = graph_data;
      }
    );
  }
}
