import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-dashboard-loan',
  templateUrl: './dashboard-loan.component.html',
  styleUrls: ['./dashboard-loan.component.css']
})
export class DashboardLoanComponent implements OnInit {
  
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {

          display: false
        }
      }],
      yAxes: [{
        gridLines: {

          display: false
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
      data: [250, 400, 500, 600, 700, 800, 680],

      backgroundColor: [
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
  constructor() { }

  ngOnInit(): void {
  }


}
