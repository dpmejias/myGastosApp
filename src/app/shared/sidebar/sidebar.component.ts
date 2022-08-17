import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';

import { filter, Subscription } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  nombre: string;
  sideBarSubs: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.sideBarSubs = this.store
      .select('user')
      .pipe(filter(({user}) => user != null))
      .subscribe(({ user }) => (this.nombre = user.nombre));
  }

  ngOnDestroy(): void {
    this.sideBarSubs.unsubscribe();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
