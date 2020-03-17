import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import {MultiDataSet, Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-project-progress',
  templateUrl: './project-progress.component.html',
  styleUrls: ['./project-progress.component.css']
})
export class ProjectProgressComponent implements OnInit {
  times = [
    "handover",
    "Completion Stage",
    "Fix Stage",
    "Lockup Stage",
    "Frame Stage",
    "Base Stage",
  ];
  times1 = [
    "Wing A","Wing B","Wing C"
  ]
  // for bar chart //
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
// for bar chart //


  // for line chart //

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

  // for line chart //

  // for bubble chart //

  public bubbleChartOptions: ChartOptions = {
 
    
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
        
          callback: value => this.times1[value]
        },
        gridLines: {

          display: false,
        }
      }],
      yAxes: [{
        ticks: {
        
          callback: value => this.times[value]
        },
        gridLines: {

          display: false
        }
      }]
    },
    legend: {
      display: false,

    },
   
   
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 7, y: 0},
      { x: 10, y: 1},
      { x: 15, y: 2 },
      { x: 26, y: 3},
      { x: 26, y: 3 },
      { x: 26, y: 3},
      { x: 26, y: 3 }
      ],
      label: 'Series A',
    },
  ];

  // End Of for bubble chart //

  public doughnutChartOptions: ChartOptions = {
  }
  public doughnutChartLabels: Label[] = ['150 uploaded', '65 documents approved', '145 Documents Pending'];
  public doughnutChartData: MultiDataSet = [
   
    [50, 150, 120],
    
    
  ];
  
  public doughnutChartType: ChartType = 'doughnut';
constructor() { }

  ngOnInit(): void {}

}
