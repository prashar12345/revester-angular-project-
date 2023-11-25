import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChartType, ChartOptions } from 'chart.js';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { AgChartOptions } from 'ag-charts-community';
import {
  SingleDataSet,
  Label,
} from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [
    ['Property', 'Sales'],
    ['In', 'timeSpent', 'Sales'],
    'property Sales',
  ];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public options: AgChartOptions;
  data: any =[
    {
      year: '2012',
      '16-24': 7088,
      '25-34': 8162,
      '35-44': 7986,
      '45-54': 7694,
      '55-64': 5624,
      '65-74': 3153,
      '75+': 1057,
    },
    {
      year: '2013',
      '16-24': 7075,
      '25-34': 8457,
      '35-44': 7952,
      '45-54': 8005,
      '55-64': 5821,
      '65-74': 3562,
      '75+': 1371,
    },
    {
      year: '2014',
      '16-24': 7074,
      '25-34': 8660,
      '35-44': 7900,
      '45-54': 8290,
      '55-64': 6060,
      '65-74': 3939,
      '75+': 1534,
    },
    {
      year: '2015',
      '16-24': 7155,
      '25-34': 8582,
      '35-44': 8053,
      '45-54': 8498,
      '55-64': 6361,
      '65-74': 4390,
      '75+': 1632,
    },
    {
      year: '2016',
      '16-24': 7129,
      '25-34': 8720,
      '35-44': 8129,
      '45-54': 8686,
      '55-64': 6607,
      '65-74': 4721,
      '75+': 1925,
    },
    {
      year: '2017',
      '16-24': 7036,
      '25-34': 8815,
      '35-44': 8118,
      '45-54': 8803,
      '55-64': 6888,
      '65-74': 5031,
      '75+': 2050,
    },
    {
      year: '2018',
      '16-24': 6992,
      '25-34': 8894,
      '35-44': 8145,
      '45-54': 8814,
      '55-64': 7189,
      '65-74': 5264,
      '75+': 2262,
    },
    {
      year: '2019',
      '16-24': 6877,
      '25-34': 8895,
      '35-44': 8243,
      '45-54': 8810,
      '55-64': 7495,
      '65-74': 5339,
      '75+': 2471,
    },
  ];
  constructor(
    private toastr: ToastrService,
    private appService: AppService,
    private fb: FormBuilder,
    private _bs: BehaviorService,
  ) {
    this.options = {
      autoSize: true,
      data: this.data,
      theme: {
        overrides: {
          column: {
            series: {
              strokeWidth: 0,
              highlightStyle: {
                strokeWidth: 1,
              },
            },
          },
        },
      },
      title: {
        text: 'Property Time',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: Office for National Statistics',
      },
      series: [
        { type: 'column', xKey: 'year', yKey: '16-24' },
        { type: 'column', xKey: 'year', yKey: '25-34' },
        { type: 'column', xKey: 'year', yKey: '35-44' },
        { type: 'column', xKey: 'year', yKey: '45-54' },
        { type: 'column', xKey: 'year', yKey: '55-64' },
        { type: 'column', xKey: 'year', yKey: '65-74' },
        { type: 'column', xKey: 'year', yKey: '75+' },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
        },
        {
          type: 'number',
          position: 'left',
          label: {
            formatter: (params: { value: number; }) => {
              return params.value / 1000 + 'M';
            },
          },
        },
      ],
    };
   
  }

 
  ngOnInit(): void {
  
   
  }

  openNav() {
    document.getElementById("mySidebar")
    document.getElementById("main")
  }

   closeNav() {
    document.getElementById("mySidebar")
    document.getElementById("main")
  }
 

}
