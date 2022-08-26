import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://api.openweathermap.org/data/2.5/onecall?lat=41.8721&lon=-87.6578&exclude=minutely&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09')
  }
  
  getHourData() {
    return this.http.get('https://api.openweathermap.org/data/2.5/onecall?lat=41.8721&lon=-87.6578&exclude=minutely,current,daily,alerts&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09')
  }
}
