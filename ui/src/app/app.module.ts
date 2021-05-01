import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShowErrorsComponent } from './show-errors.component';
import { BirthYearValidatorDirective } from './validators/birth-year-validator.directive';
import { TelephoneNumberFormatValidatorDirective } from './validators/telephone-number-format-validator.directive';
import { TelephoneNumbersValidatorDirective } from './validators/telephone-numbers-validator.directive';
import { EmailFormatValidatorDirective } from './validators/email-format-validator.directive';
import { UrlFormatValidatorDirective } from './validators/url-format-validator.directive';

import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';

import { CheckboxRenderer } from './renders/checkbox-renderer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxRenderer,
    SafeHtmlPipe,
    ShowErrorsComponent,
    BirthYearValidatorDirective,
    TelephoneNumberFormatValidatorDirective,
    TelephoneNumbersValidatorDirective,
    EmailFormatValidatorDirective,
    UrlFormatValidatorDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([CheckboxRenderer]),
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
