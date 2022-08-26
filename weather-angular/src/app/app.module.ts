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
import { DayJSPipe } from './day-js.pipe';
import { NgxEchartsModule } from 'ngx-echarts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LandingComponent } from './landing/landing.component';
import { RecentComponent } from './recent/recent.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BodyComponent,
    HourlyComponent,
    ForecastComponent,
    DayJSPipe,
    LandingComponent,
    RecentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
