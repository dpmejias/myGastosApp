import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  loading: boolean = false;
  uiSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.uiSubs = this.store.select('ui')
                    .subscribe(ui => {
                      this.loading = ui.isLoading;
                      console.log('Cargando subs');
                    })
  }

  ngOnDestroy(): void {
    this.uiSubs.unsubscribe();
  }

  loginUsuario() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch( ui.isLoading() );
    
    // Swal.fire({
    //   title: 'Auto close alert!',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const { email, password } = this.loginForm.value;
    this.authService
      .loginUsuario(email, password)
      .then((credenciales) => {
        // console.log(credenciales); 
        // Swal.close();
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });
  }
}
