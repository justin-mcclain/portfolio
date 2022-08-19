import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss'],
})
export class HourlyComponent implements OnInit {
  city: any;
  lat: any;
  lon: any;
  hourData: any;

  constructor(private route: ActivatedRoute, public dataSerivce: DataService) {}

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city');
    this.lat = this.route.snapshot.paramMap.get('lat');
    this.lon = this.route.snapshot.paramMap.get('lon');
    this.dataSerivce
      .getHourData(this.lat, this.lon)
      .subscribe((data) => (this.hourData = data));
  }
}
