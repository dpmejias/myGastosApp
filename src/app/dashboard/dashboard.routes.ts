import { Routes } from "@angular/router";

import { DetalleComponent } from "../my-gastos/detalle/detalle.component";
import { EstadisticaComponent } from "../my-gastos/estadistica/estadistica.component";
import { MyGastosComponent } from "../my-gastos/my-gastos.component";

export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent},
    { path: 'my-gastos', component: MyGastosComponent},
    { path: 'detalle', component: DetalleComponent},
];