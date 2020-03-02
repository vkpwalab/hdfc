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
  };
  public barChartLabels: Label[] = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5', 'Project6', 'Project7'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', }
    
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
