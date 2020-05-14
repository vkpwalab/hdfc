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
  myArr: any = [];
  myArr1: any = [];
  array_project_name: any =[];
  array_tot_sanction: any =[];
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
        ticks: {min: 0, max:1000}
      }]
    },
    legend: {
      display: false,
      
    },
    
     
  
  };
  
  public barChartLabels: Label[] = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5', 'Project6', 'Project7'];
  public barChartType: ChartType = 'bar';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [

    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
    {
      data:  [250, 400, 500, 600, 700, 800, 680],

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

  texto : string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
  government_link: any;
  news: any;
  graph_details: any=[];
  
  constructor(public router:Router,private shared: SharedService) { }

  ngOnInit(): void {
   this.getGovernmentLink()
   this.getNews()
  
  }

  

  getGovernmentLink() {
    let body_government_link = { i_builder_id: '466073',I_LINK_TYPE: 'GL',  Token: 'MH3NPYK34J0KHDI' };
    console.log(body_government_link)
    setTimeout(() => {

      (<any>this.shared.client).GET_LINK_DETAILS(body_government_link).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.GET_LINK_DETAILSResult;
          console.log(result);

          var result_json = JSON.parse(result)
          console.log("object", result_json)

          this.government_link = result_json.Table;
          
         },
        err => console.log(err)
      );

    }, 1000);
    
  }
  getNews() {
    let body_news_article = { i_builder_id: '466073',I_LINK_TYPE: 'NA',  Token: 'MH3NPYK34J0KHDI' };
    console.log(body_news_article)
    setTimeout(() => {

      (<any>this.shared.client).GET_LINK_DETAILS(body_news_article).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.GET_LINK_DETAILSResult;
          console.log(result);

          var result_json = JSON.parse(result)
          console.log("object", result_json)

          this.news = result_json.Table;
          
         },
        err => console.log(err)
      );

    }, 1000);
    
  }
}
 