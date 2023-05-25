import { TieInterceptor } from './services/tie.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule} from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomerComponent } from './module/customer/customer.component';







@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CustomerComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,

  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass : TieInterceptor, multi : true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
