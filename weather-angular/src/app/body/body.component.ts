import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

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

  constructor(private route: ActivatedRoute, public dataSerivce: DataService) {}

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city');
    this.lat = this.route.snapshot.paramMap.get('lat');
    this.lon = this.route.snapshot.paramMap.get('lon');
    this.dataSerivce
      .getData2(this.lat, this.lon)
      .subscribe((data) => (this.weatherData = data));
    this.dataSerivce
      .getAir(this.lat, this.lon)
      .subscribe((data) => (this.airData = data));
    // if (this.weatherData.daily[0].uvi < 3) {
    //   this.uv = 'Low';
    // } else if (this.weatherData.daily[0].uvi < 6) {
    //   this.uv = 'Moderate';
    // } else if (this.weatherData.daily[0].uvi < 8) {
    //   this.uv = 'High';
    // } else if (this.weatherData.daily[0].uvi > 7) {
    //   this.uv = 'Very High';
    // }
  }
}
