import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  city: any;
  lat: any;
  lon: any;
  weeklyData: any;

  constructor(private route: ActivatedRoute, public dataSerivce: DataService) {}

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city');
    this.lat = this.route.snapshot.paramMap.get('lat');
    this.lon = this.route.snapshot.paramMap.get('lon');
    this.dataSerivce
      .getForecast(this.lat, this.lon)
      .subscribe((data) => (this.weeklyData = data));
  }
}
