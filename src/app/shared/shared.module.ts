import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatLegacyRadioModule as MatRadioModule }  from '@angular/material/legacy-radio';
import  localeFr from "@angular/common/locales/fr-BE";
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import {  MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule} from 'ngx-pagination';
import { MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';



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
    AngularEditorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    DragDropModule

  ],
  providers : [{ provide: LOCALE_ID , useValue : "fr-BE"}],

})
export class SharedModule { }
