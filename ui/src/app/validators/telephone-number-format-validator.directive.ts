import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[telephoneNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: TelephoneNumberFormatValidatorDirective, multi: true}]
})
export class TelephoneNumberFormatValidatorDirective implements Validator {

  validate(c: FormControl): ValidationErrors {
    const isValidPhoneNumber = /^\d{3,3}\s*\d{3,3}\s*\d{4,4}$/.test(c.value);
    const message = {
      'telephoneNumber': {
        'message': 'The phone number must be valid (XXX XXX XXXX, where X is a digit)'
      }
    };
    return isValidPhoneNumber ? null : message;
  }
}
