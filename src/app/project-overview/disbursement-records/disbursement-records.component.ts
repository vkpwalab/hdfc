  import { Component, OnInit } from '@angular/core';
  import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
  import { Label } from 'ng2-charts';
  @Component({
    selector: 'app-disbursement-records',
    templateUrl: './disbursement-records.component.html',
    styleUrls: ['./disbursement-records.component.css']
  })
  export class DisbursementRecordsComponent implements OnInit {
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

            display: true,
          },
          ticks: {min: 0, max:50}
        }]
      },
      legend: {
        display: false,
        
      },
      
      
    
    };
    
    public barChartLabels: Label[] = ['2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22'];
    public barChartType: ChartType = 'bar';

    public barChartLegend = true;
    public barChartPlugins = [];

    public barChartData: ChartDataSets[] = [

      // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
      {
        data: [10,25,20,15,5,10],

        backgroundColor: [
          'rgb(85,202,173)',
          'rgb(85,202,173)',
          'rgb(85,202,173)',
          'rgb(85,202,173)',
          'rgb(85,202,173)',
          'rgb(85,202,173)',
          'rgb(85,202,173)'
        ],
        barThickness: 20,
        // hoverBorderWidth: 20,
        label: "Disbursment Amount"
        

      },





    ];
    constructor() { }

    ngOnInit(): void {
    }

  }
