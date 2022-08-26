import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import * as dayjs from 'dayjs';
import { formatDate } from '@angular/common';

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
  adjust: number = 0;
  slicedHourData: any;
  hourMath: any;
  currentHour: any = new Date()
  mathedHour: any;

  constructor(private route: ActivatedRoute, public dataSerivce: DataService) {
    this.mathedHour = formatDate(this.currentHour, 'HH', 'en-US')
    this.mathedHour = this.mathedHour - this.adjust
  }

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city');
    this.lat = this.route.snapshot.paramMap.get('lat');
    this.lon = this.route.snapshot.paramMap.get('lon');
    this.dataSerivce.getHourData(this.lat, this.lon).subscribe((data) => {
      if (data) {
        this.hourData = data;
      }
      if (this.hourData.timezone_offset === -14400) {
        this.adjust = -3600;
      } else if (this.hourData.timezone_offset === -25200) {
        this.adjust = 7200;
      } else if (this.hourData.timezone_offset === -21600) {
        this.adjust = 3600;
      } else {
        this.adjust = 0;
      }
      this.hourMath = 24 - this.mathedHour + ((this.adjust) / 60 ) / 60
      this.slicedHourData = this.hourData.hourly.slice(1,this.hourMath)
    });
  }
}
