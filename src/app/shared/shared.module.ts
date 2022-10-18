import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule} from '@angular/material/radio';
import  localeFr from "@angular/common/locales/fr-BE";
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';

registerLocaleData( localeFr , 'fr-BE');

@NgModule({
  declarations: [],

  imports: [
    CommonModule,

  ],
  exports:[
    CommonModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    MatExpansionModule,
    MatCheckboxModule,

  ],
  providers : [{ provide: LOCALE_ID , useValue : "fr-BE"}],
})
export class SharedModule { }
