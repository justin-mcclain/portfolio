import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  cityList: any = JSON.parse(localStorage.getItem('rc') || '{}');
  weatherData: any;
  cityData: any;
  uv: any;

  constructor(private route: ActivatedRoute, public dataSerivce: DataService) {}

  ngOnInit(): void {
    console.log(this.cityList, "CITYLIST")
    if (Object.keys(this.cityList).length > 0) {
      this.dataSerivce
        .getData2(
          this.cityList[0].lat.toString(),
          this.cityList[0].lon.toString()
        )
        .subscribe((data) => {
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
          } else {
            console.log(("HMMMMM"))
          }
        });
      this.dataSerivce
        .getCity(
          this.cityList[0].lat.toString(),
          this.cityList[0].lon.toString()
        )
        .subscribe((data) => {
          if (data) {
            this.cityData = data;
          }
        });
    } else {
      this.dataSerivce.getData().subscribe((data) => {
        if (data) {
          this.weatherData = data
          console.log(this.weatherData)
        } else {
          console.log("weather data problem")
        }
      });
      this.dataSerivce
        .getCity('41.8721', '-87.6578')
        .subscribe((data) => (this.cityData = data));
    }
  }
}
