import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home/home.component';
import { HourlyComponent } from './hourly/hourly.component';
import { ForecastComponent } from './forecast/forecast.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [{ path: '', component: LandingComponent}, {path: "weather/current/:city/:lat/:lon", component: BodyComponent}, {path: "weather/hourly/:city/:lat/:lon", component: HourlyComponent}, {path: "weather/forecast/:city/:lat/:lon", component: ForecastComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
