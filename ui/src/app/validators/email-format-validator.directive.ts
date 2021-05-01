import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[email]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailFormatValidatorDirective, multi: true}]
})
export class EmailFormatValidatorDirective implements Validator {

  validate(c: FormControl): ValidationErrors {
    if (c.value == undefined || c.value == null || c.value.length == 0) {
      return null;
    }
    const isValid = /^\w+@\w+\.\w+$/.test(c.value);
    const message = {
      'email': {
        'message': 'The email must be valid (XXX@XXX.XXXX)'
      }
    };
    return isValid ? null : message;
  }
}
