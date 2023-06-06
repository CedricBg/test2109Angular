
import { MatDialogModule } from '@angular/material/dialog';
import { enableProdMode, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { TieInterceptor } from './app/services/tie.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { Routes, provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';



if (environment.production) {
  enableProdMode();
}

const routes: Routes = [

  { path: 'auth' ,  title:'Connexion', loadChildren: ()=> import('./app/components/auth/auth.routes')},
  { path: 'OPS',  title: 'Opérations' ,  loadChildren: ()=> import('./app/components/operations/operations.routes')},
  { path: 'agent', title: sessionStorage.getItem('firstName'), loadChildren: ()=> import('./app/components/agent/agent.route')},
  { path: 'ronde',   loadChildren: ()=> import('./app/components/ronde/ronde.routes')},
  { path: '', redirectTo : 'auth', pathMatch : 'full'},
];


bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(BrowserModule, CommonModule,MatDialogModule,MatSnackBarModule),
        { provide: HTTP_INTERCEPTORS, useClass: TieInterceptor, multi: true },
        provideAnimations(),
        provideRouter(routes)

    ]
})
  .catch(err => console.error(err));
