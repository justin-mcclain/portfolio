import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  myData: any;
  hourData: any;

  constructor(private dataSerivce: DataService) {}

  ngOnInit(): void {
    this.dataSerivce.getData().subscribe((data) => {
      this.myData = data;
    });
    this.dataSerivce.getHourData().subscribe((data) => {
      this.hourData = data;
    });
  }
}
