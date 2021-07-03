import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Color, Label } from 'ng2-charts';
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient } from '@angular/common/http';
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
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'horizontalBar';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [],

      backgroundColor: 'rgb(253,194,52)',
      hoverBackgroundColor: 'rgb(253,194,52)',
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
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors: Color[] = [
    {
      backgroundColor: ['rgb(92, 122, 255)','rgb(251, 203, 38)','rgb(11, 210, 173)']
    },
  ];

  @Input() project_id: any;
  token: string;
  building_list: any;
  uploaded_doc: any = 0;
  pending_doc: any = 0;
  approved_doc: any = 0;
  constructor( private shared:SharedService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth-token');
    this.getBuildingProgress();
    this.getAllDoc();
   }

  getBuildingProgress() {
    let body_Building_List = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:get_project_building>
                                      <!--Optional:-->
                                      <tem:i_project_no>${this.project_id}</tem:i_project_no>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                  </tem:get_project_building>
                                </soapenv:Body>
                            </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/get_project_building';
    let result_tag = 'get_project_buildingResult';
    this.shared.getData(soapaction, body_Building_List, result_tag).subscribe(
      (data) => {
        this.building_list = data.Table;
        console.log(this.building_list);
        this.barChartLabels = [];
        this.barChartData[0].data = [];
        let graph_data = [];
        this.building_list.forEach(element => {
          this.barChartLabels.push(element.BLDG_SHORT_NAME);

          if(element.BLDG_CONS_STATUS != null){
            graph_data.push(element.BLDG_CONS_STATUS);
          }else{
            graph_data.push(0);
          }
   
        });

        this.barChartData[0].data = graph_data;
      }
    );
  }

  getAllDoc(){
    let body_Show_All_Doc = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                              <soapenv:Header/>
                              <soapenv:Body>
                                <tem:Show_All_Doc>
                                    <!--Optional:-->
                                    <tem:I_PROJECT_No>${this.project_id}</tem:I_PROJECT_No>
                                </tem:Show_All_Doc>
                              </soapenv:Body>
                          </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/Show_All_Doc';
    let result_tag = 'Show_All_DocResult';
    this.shared.getData(soapaction, body_Show_All_Doc, result_tag).subscribe(
      (data) => {
        let all_doc = data.Table;
        this.uploaded_doc = all_doc.length;
        all_doc.forEach(element => {   
          if(element.STATUS == 'NOT OK'){
            this.pending_doc = this.pending_doc + 1;
          }else if(element.STATUS == 'EVALUATION OK'){
            this.approved_doc = this.approved_doc + 1;
          }
        });
        this.doughnutChartLabels = ['Uploaded', 'Pending','Reviewed']
        this.doughnutChartData = [[this.uploaded_doc,this.pending_doc,this.approved_doc]];
      }
    );
  }

}
