import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BodyComponent } from './body/body.component';
import { HourlyComponent } from './hourly/hourly.component';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, BodyComponent, HourlyComponent, ForecastComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
