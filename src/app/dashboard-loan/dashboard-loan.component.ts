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
        }
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
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue'
      ],
      barThickness: 20,


    },





  ];

  constructor() { }

  ngOnInit(): void {
  }


}
