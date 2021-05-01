import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[birthYear]',
  providers: [{provide: NG_VALIDATORS, useExisting: BirthYearValidatorDirective, multi: true}]
})
export class BirthYearValidatorDirective implements Validator {

  validate(c: FormControl): ValidationErrors {
    if (c.value == undefined || c.value == null || c.value.length == 0) {
      return null;
    }
    const value = new Date(c.value).getFullYear();
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 85;
    const maxYear = currentYear - 18;
    const isValid = !isNaN(value) && value >= minYear && value <= maxYear;
    const message = {
      'birthYear': {
        'message': 'The year must be a valid number between ' + minYear + ' and ' + maxYear
      }
    };
    return isValid ? null : message;
  }
}
