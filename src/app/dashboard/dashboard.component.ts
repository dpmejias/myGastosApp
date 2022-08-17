import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as ieActions from '../my-gastos/my-gastos.actions';

import { filter, Subscription } from 'rxjs';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ieSubs: Subscription;

  constructor(private store: Store<AppState>,
              private ies: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({ user }) => {
        this.ieSubs = this.ies.initItemsTesoreriaListener(user.uid)
          .subscribe(ieFb => {
            this.store.dispatch( ieActions.setItems( { items: ieFb } ) )
          });
      })
  }

  ngOnDestroy(): void {
    this.ieSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }

}
