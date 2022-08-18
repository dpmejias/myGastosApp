import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MyGastosComponent } from './my-gastos.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenTesoreriaPipe } from '../pipes/orden-tesoreria.pipe';

import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { myGastosReducer } from './my-gastos.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    MyGastosComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenTesoreriaPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingEgr', myGastosReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule,
  ],
})
export class MyGastosModule {}
