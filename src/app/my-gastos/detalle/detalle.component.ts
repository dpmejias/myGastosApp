import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';

import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  tesoreria: IngresoEgreso[] = [];
  tesoreriaSubs: Subscription;

  constructor(private store: Store<AppState>,
              private ieService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.tesoreriaSubs = this.store.select('ingEgr').subscribe(({ items }) => this.tesoreria = [...items]);
  }

  ngOnDestroy(): void {
    this.tesoreriaSubs.unsubscribe();
  }

  borrar(uid: string) {
    let ieData: IngresoEgreso;
    this.tesoreria.find(filt => {
      if (filt.uid === uid) {
        ieData = filt;
      }
    });

    this.ieService
      .borrarItemTesoreria(uid)
      .then(() =>
        Swal.fire(
          'Eliminado con éxito!!!',
          `${ieData.descripcion} con el monto ${ieData.monto}`,
          'success'
        )
      )
      .catch((err) => Swal.fire('Error!', err.message, 'error'));
  }

}
