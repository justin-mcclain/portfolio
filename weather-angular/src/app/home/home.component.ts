import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  city: any;
  lat: any;
  lon: any;
  cityData: any;

  constructor(
    public dataSerivce: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city');
    this.lat = this.route.snapshot.paramMap.get('lat');
    this.lon = this.route.snapshot.paramMap.get('lon');
    console.log(this.city, 'HELLO');
    this.dataSerivce.getCity(this.lat, this.lon).subscribe((data) => {
      (this.cityData = data);
    });
  }
}
