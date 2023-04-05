import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatRadioModule }  from '@angular/material/radio';
import  localeFr from "@angular/common/locales/fr-BE";
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule} from 'ngx-pagination';
import { MatCardModule} from '@angular/material/card';
import { PageEvent } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule} from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    OrderModule,
    NgxPaginationModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatStepperModule,
    MatSnackBarModule,

  ],
  providers : [{ provide: LOCALE_ID , useValue : "fr-BE"}],

})
export class SharedModule { }
