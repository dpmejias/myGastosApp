import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// import { provideAuth,getAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { appReducers } from './app.reducer';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyGastosComponent } from './my-gastos/my-gastos.component';
import { EstadisticaComponent } from './my-gastos/estadistica/estadistica.component';
import { DetalleComponent } from './my-gastos/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MyGastosComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
