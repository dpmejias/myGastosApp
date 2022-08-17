import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../shared/ui.actions';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm!: FormGroup;
  loading: boolean = false;
  uiSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubs = this.store.select('ui').subscribe((ui) => {
      this.loading = ui.isLoading;
      console.log('Cargando subs');
    });
  }

  ngOnDestroy(): void {
    this.uiSubs.unsubscribe();
  }

  crearUsuario() {
    if (this.registroForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Auto close alert!',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { usuario, correo, password } = this.registroForm.value;
    this.authService
      .crearUsuario(usuario, correo, password)
      .then((credenciales) => {
        // console.log(credenciales);
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
