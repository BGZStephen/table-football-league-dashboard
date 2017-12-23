import { RouterModule, Routes } from '@angular/router';

import * as dashboard from 'app/components/dashboard-components-barrel';

const APP_ROUTES: Routes = [
  {path: '', component: dashboard.DashboardViewWrapperComponent, children: [
    {path: '', component: dashboard.DashboardHomeComponent},
    {path: 'teams', component: dashboard.DashboardTeamsComponent},
    {path: 'leagues', component: dashboard.DashboardLeaguesComponent},
    {path: 'fixtures', component: dashboard.DashboardFixturesComponent},
    {path: 'account', component: dashboard.DashboardAccountComponent},
  ]},
]

export const AppRoutes = RouterModule.forRoot(APP_ROUTES);
