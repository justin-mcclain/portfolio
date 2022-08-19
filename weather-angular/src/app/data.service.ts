import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/onecall?lat=41.8721&lon=-87.6578&exclude=minutely&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09'
    );
  }
  getData2(lat: string, lon: string) {
    return this.http.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
    );
  }

  getHourData(lat: string, lon: string) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current,daily,alerts&units=imperial&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
    );
  }

  getCity(lat: string, lon: string) {
    return this.http.get(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
    )
  }

  getZip(zip: string) {
    return this.http.get(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
    );
  }

  getAir(lat: string, lon: string) {
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=9ce1a7cb8abfdaed2fdb4b805a138c09`
    )
  }
}
