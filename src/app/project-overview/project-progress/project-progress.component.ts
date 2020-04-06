import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-project-progress',
  templateUrl: './project-progress.component.html',
  styleUrls: ['./project-progress.component.css']
})
export class ProjectProgressComponent implements OnInit {


  // for bar chart //
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{

        gridLines: {

          display: true,
        }
      }],
      yAxes: [{

        gridLines: {

          display: true
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
      hoverBackgroundColor: [
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
    { data: [0, 10, 5, 15, 20, 25] },

  ];
  public lineChartLabels: Label[] = ['WingA', 'WingB', 'WingC'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{

        gridLines: {

          display: true,
        }
      }],
      yAxes: [{

        gridLines: {

          display: true
        }
      }]
    },
  };

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,255,255)',
      borderColor: 'rgb(15, 210, 172)',
      // backgroundColor: 'white',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  // for line chart //

  // for bubble chart //

  times = [
    "handover",
    "Completion Stage",
    "Fix Stage",
    "Lockup Stage",
    "Frame Stage",
    "Base Stage",
  ];
  times1 = [
    "Wing A", "Wing B", "Wing C"
  ]
  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    // scales: {
    //   xAxes: [{
    //     ticks: {

    //       callback: value => this.times1[value]
    //     },
    //     gridLines: {

    //       display: false,
    //     }
    //   }],
    //   yAxes: [{
    //     ticks: {

    //       callback: value => this.times[value]
    //     },
    //     gridLines: {

    //       display: false
    //     }
    //   }]
    // },
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 30,
        },
        gridLines: {display: true}
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 30,
        },
        gridLines: {display: true}
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
        // { x: 'Wing A', y: 'Completion Stage', r:10 },
        // { x: 'Wing B', y: 'Completion Stage', r:10 },
        // { x: 'Wing C', y: 'Completion Stage', r:10 },
        { x: 10, y: 10, r: 10 },
        { x: 15, y: 5, r: 10 },
        { x: 26, y: 12, r: 10 },
        { x: 7, y: 8, r: 10 },
      ],
    },
  ];


  // End Of for bubble chart //

  public doughnutChartOptions: ChartOptions = {
    legend: {
      display: false,

    },
  }
  public doughnutChartLabels: Label[] = ['150 uploaded', '65 documents approved', '145 Documents Pending'];
  public doughnutChartData: MultiDataSet = [
    [50, 150, 120]
  ];

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors: Color[] = [
    {
      backgroundColor: ['rgb(92, 122, 255)','rgb(251, 203, 38)','rgb(11, 210, 173)']
    },
  ];
  constructor() { }

  ngOnInit(): void { }

}
