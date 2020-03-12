import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-project-progress',
  templateUrl: './project-progress.component.html',
  styleUrls: ['./project-progress.component.css']
})
export class ProjectProgressComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{

        gridLines: {

          display: false,
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
  public barChartLabels: Label[] = ['WingA', 'WingB', 'WingC'];
  public barChartType: ChartType = 'horizontalBar';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [60, 20, 10],

      backgroundColor: [
        'rgb(253,194,52)',
        'rgb(253,194,52)',
        'rgb(253,194,52)'

      ],
      barThickness: 10,
      // hoverBorderWidth: 20,
      label: "Loan Amount"


    },





  ];



  public lineChartData: ChartDataSets[] = [
    { data: [0, 5, 10, 15, 20, 25] },

  ];
  public lineChartLabels: Label[] = ['WingA', 'WingB', 'WingC'];
  public lineChartOptions: {
    responsive: true,
   };

  public lineChartColors: Color[] = [
    {
      borderColor: 'rgb(171,222,211)',
      // backgroundColor: 'white',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor() { }

  ngOnInit(): void {}

}
