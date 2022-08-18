import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private as: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.as.isAuth()
      .pipe(
        tap((estado) => {
          if (!estado) {
            this.router.navigate(['/login']);
          }
        }),
        take(1)
    );
  }
  canLoad(): Observable<boolean> {
    return this.as.isAuth().pipe(
      tap((estado) => {
        if (!estado) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
