import { unSetUser } from './../auth/auth.actions';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import * as ieActions from '../my-gastos/my-gastos.actions';

import { map, Subscription } from 'rxjs';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSubs!: Subscription;
  private _usuario: Usuario;

  get usuario() {
    // return {...this._usuario};
    return this._usuario;
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.userSubs = this.firestore
          .doc(`${fuser.uid}/usuario`)
          .valueChanges()
          .subscribe((fU: any) => {
            const user = Usuario.fromFirebase({ ...fU });
            this._usuario = user;
            this.store.dispatch(authActions.setUser({ user }));
          });
        } else {
          this._usuario = null;
          this.userSubs.unsubscribe();
          this.store.dispatch(authActions.unSetUser());
          this.store.dispatch(ieActions.unSetItems());
      }
    });
  }

  crearUsuario(usuario: string, email: string, passw: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, passw)
      .then(({ user }) => {
        const newUser = new Usuario(user?.uid!, usuario, email);
        return this.firestore.doc(`${user?.uid}/usuario`).set({ ...newUser });
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
