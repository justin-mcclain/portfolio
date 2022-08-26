import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  city: any;
  lat: any;
  lon: any;
  weatherData: any;
  uv: any;
  airData: any;
  airQual: any;
  graphData: any = {};
  timeData: any = [];
  tempData: any = [];
  xAxisData: any;
  yAxisData: any;
  adjust: number = 0;
  loaded: boolean = false;

  constructor(private route: ActivatedRoute, public dataSerivce: DataService) {
    Chart.register(ChartDataLabels);
  }

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city');
    this.lat = this.route.snapshot.paramMap.get('lat');
    this.lon = this.route.snapshot.paramMap.get('lon');
    this.dataSerivce.getData2(this.lat, this.lon).subscribe((data) => {
      if (data) {
        this.weatherData = data;
      }
      if (this.weatherData.daily[0].uvi < 3) {
        this.uv = 'Low';
      } else if (this.weatherData.daily[0].uvi < 6) {
        this.uv = 'Moderate';
      } else if (this.weatherData.daily[0].uvi < 8) {
        this.uv = 'High';
      } else if (this.weatherData.daily[0].uvi > 7) {
        this.uv = 'Very High';
      }
    });
    this.dataSerivce.getAir(this.lat, this.lon).subscribe((data) => {
      if (data) {
        this.airData = data;
      }
      if (this.airData.list[0].main.aqi === 1) {
        this.airQual = 'Good';
      } else if (this.airData.list[0].main.aqi === 2) {
        this.airQual = 'Fair';
      } else if (this.airData.list[0].main.aqi === 3) {
        this.airQual = 'Moderate';
      } else if (this.airData.list[0].main.aqi === 4) {
        this.airQual = 'Poor';
      } else if (this.airData.list[0].main.aqi === 5) {
        this.airQual = 'Very Poor';
      }
    });
    this.dataSerivce.getHourData(this.lat, this.lon).subscribe((data) => {
      if (data) {
        this.graphData = data;
      }
      if (this.graphData.timezone_offset === -14400) {
        this.adjust = -3600;
      } else if (this.graphData.timezone_offset === -25200) {
        this.adjust = 7200;
      } else if (this.graphData.timezone_offset === -21600) {
        this.adjust = 3600;
      } else {
        this.adjust = 0;
      }
      this.tempData = this.graphData.hourly
        .slice(0, 8)
        .map((graph: any) => graph.temp.toFixed());
      this.timeData = this.graphData.hourly
        .slice(0, 8)
        .map((graph: any) =>
          formatDate(graph.dt * 1000, 'h', 'en-US').toString()
        );
    });
    this.loaded = true;
  }
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'Temp',
        data: this.loaded ? this.tempData : null,
        fill: true,
        borderColor: '#f1612b',
        backgroundColor: '#f1642b2e',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.25,
        datalabels: {
          labels: {
            value: {
              color: 'black',
            },
          },
          align: 'end',
          offset: -0.5,
        },
      },
    ],
    labels: this.timeData,
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          stepSize: 1,
          display: false,
        },
        grace: 3,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public lineChartType: ChartType = 'line';
}
