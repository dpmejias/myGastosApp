import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-my-gastos',
  templateUrl: './my-gastos.component.html',
  styles: [],
})
export class MyGastosComponent implements OnInit, OnDestroy {
  tesoreriaForm: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean = false;
  uiSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ies: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.tesoreriaForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });

    this.uiSubs = this.store.select('ui')
      .subscribe(({ isLoading }) => this.loading = isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubs.unsubscribe();
  }

  guardar() {    
    
    if (this.tesoreriaForm.invalid) {
      return;
    }
    
    this.store.dispatch(ui.isLoading());
    
    const { descripcion, monto } = this.tesoreriaForm.value;

    const ingEgr = new IngresoEgreso(this.tipo, descripcion, monto);

    this.ies
      .crearIngEgr(ingEgr)
      .then(() => {
        this.tesoreriaForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Insertado con éxito!', descripcion, 'success');
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error!', err.message, 'error');
      });
  }
}
