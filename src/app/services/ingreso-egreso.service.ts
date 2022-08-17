import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

import { IngresoEgreso } from '../models/ingreso-egreso.model';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private fs: AngularFirestore,
              private as: AuthService) { }

  crearIngEgr(ie: IngresoEgreso) {
    const uid = this.as.usuario.uid;
    delete ie.uid;
    return this.fs.doc(`${uid}/tesoreria`)
      .collection('items')
      .add({ ...ie })
  }

  initItemsTesoreriaListener(uid: string) {
    return this.fs.collection(`${uid}/tesoreria/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })
        ))
      );
  }

  borrarItemTesoreria(uidItem: string) {
    const uidD = this.as.usuario.uid;
    return this.fs.doc(`${uidD}/tesoreria/items/${uidItem}`).delete();
  }

}
