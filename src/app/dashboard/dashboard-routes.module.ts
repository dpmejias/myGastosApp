import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AuthGuard } from '../services/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const routesHijas: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [ AuthGuard ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesHijas)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
