import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  myData: any;
  hourData: any;
  newZip: string = "";
  newerZip: any;

  constructor(public dataSerivce: DataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.dataSerivce.getData().subscribe((data) => {
      this.myData = data;
    });
  }

  search(zip: string): void{
    this.dataSerivce.getZip(zip).subscribe((data)=>{
      this.newerZip = data;
      this.router.navigateByUrl('weather/current/' + this.newerZip.name + '/' + this.newerZip.lat + '/' + this.newerZip.lon)
      this.newZip = ""
    })
    console.log(this.newerZip)
  }
}

