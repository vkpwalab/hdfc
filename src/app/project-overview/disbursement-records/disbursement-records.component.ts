import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SharedService } from '../../services/shared.service';
import { HttpClient } from '@angular/common/http';
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
        // ticks: { min: 0, max: 50 }
      }]
    },
    legend: {
      display: false,

    },



  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [

    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
    {
      data: [],

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
  @Input() project_id: any;
  token: string;
  disbursment_records: any;
  constructor(private shared: SharedService, private http: HttpClient) { }

  ngOnInit(): void {
    this.token = 'MH3NPYK34J0KHDI';
    this.getDisbursmentRecord('Y');
  }

  getDisbursmentRecord(type) {
    console.log(type);
    let body_Building_List = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                <soapenv:Header/>
                                <soapenv:Body>
                                  <tem:GET_PROJ_DISB_RECORD_YMW>
                                      <!--Optional:-->
                                      <tem:i_project_id>${this.project_id}</tem:i_project_id>
                                      <!--Optional:-->
                                      <tem:I_TYPE>${type}</tem:I_TYPE>
                                      <!--Optional:-->
                                      <tem:Token>${this.token}</tem:Token>
                                  </tem:GET_PROJ_DISB_RECORD_YMW>
                                </soapenv:Body>
                            </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_PROJ_DISB_RECORD_YMW';
    let result_tag = 'GET_PROJ_DISB_RECORD_YMWResult';
    this.shared.getData(soapaction, body_Building_List, result_tag).subscribe(
      (data) => {
        this.disbursment_records = data.Table;
        this.barChartLabels = [];
        this.barChartData[0].data = [];
        let graph_data = [];
        console.log(this.disbursment_records)
        this.disbursment_records.forEach(element => {
          this.barChartLabels.push(element.DISB_MADE_ON);
          graph_data.push(element.DISB_AMOUNT);
        });
        this.barChartData[0].data = graph_data;
      }
    );
  }
}
