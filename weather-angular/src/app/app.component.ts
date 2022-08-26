import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  myData: any;
  hourData: any;
  newZip: string = '';
  newerZip: any;
  cityList = localStorage.getItem('rc');
  cityInfo: any;
  namedCityList: any = [];

  constructor(
    public dataSerivce: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataSerivce.getData().subscribe((data) => {
      this.myData = data;
    });
    if (this.cityList !== null) {
      JSON.parse(this.cityList).map((city: any, index: number) => {
        this.dataSerivce.getCity(city.lat, city.lon).subscribe((data) => {
          if (data) {
            this.cityInfo = data;
          }
          this.namedCityList = [
            ...this.namedCityList,
            {
              name: this.cityInfo[0].name,
              state: this.cityInfo[0].state,
              lat: city.lat,
              lon: city.lon,
              zip: city.zip,
              index,
            },
          ];
          this.namedCityList.sort((a: any, b: any) => a.index - b.index);
        });
        console.log(index, city);
      });
    }
  }

  search(zip: string): void {
    this.dataSerivce.getZip(zip).subscribe((data) => {
      this.newerZip = data;
      this.newZip = '';
      if (this.cityList === null) {
        localStorage.setItem(
          'rc',
          JSON.stringify([
            {
              lat: this.newerZip.lat,
              lon: this.newerZip.lon,
              zip: zip,
            },
          ])
        );
      } else if (JSON.parse(this.cityList).length > 6) {
        const tooLong = JSON.parse(this.cityList);
        for (var i = 0; i < tooLong.length; i++) {
          if (
            tooLong[i].lat === this.newerZip.lat &&
            tooLong[i].lon === this.newerZip.lon
          ) {
            tooLong.splice(i, 1);
            i--;
          }
        }
        tooLong.unshift({
          lat: this.newerZip.lat,
          lon: this.newerZip.lon,
          zip: zip,
        });
        localStorage.setItem('rc', JSON.stringify(tooLong));
      } else if (JSON.parse(this.cityList).length > 6) {
        const prevRecent = JSON.parse(this.cityList);
        prevRecent.pop();
        prevRecent.unshift({
          lat: this.newerZip.lat,
          lon: this.newerZip.lon,
          zip: zip,
        });
        localStorage.setItem('rc', JSON.stringify(prevRecent));
      } else {
        const prevRecent = JSON.parse(this.cityList);
        prevRecent.unshift({
          lat: this.newerZip.lat,
          lon: this.newerZip.lon,
          zip: zip,
        });
        localStorage.setItem('rc', JSON.stringify(prevRecent));
      }
      this.router
        .navigateByUrl(
          'weather/current/' +
            this.newerZip.name +
            '/' +
            this.newerZip.lat +
            '/' +
            this.newerZip.lon
        )
        .then(() => {
          window.location.reload();
        });
    });
  }
}
