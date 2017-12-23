import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutes } from 'app/app.routes';
import * as dashboard from 'app/components/dashboard-components-barrel';
@NgModule({
  declarations: [
    dashboard.DashboardHomeComponent,
    dashboard.DashboardNavbarComponent,
    dashboard.DashboardViewWrapperComponent,
    dashboard.DashboardFixturesComponent,
    dashboard.DashboardTeamsComponent,
    dashboard.DashboardLeaguesComponent,
    dashboard.DashboardAccountComponent,
    dashboard.DashboardNavbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutes,
  ],
  providers: [],
})
export class DashboardModule { }
