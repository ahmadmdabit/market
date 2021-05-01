import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[url]',
  providers: [{provide: NG_VALIDATORS, useExisting: UrlFormatValidatorDirective, multi: true}]
})
export class UrlFormatValidatorDirective implements Validator {

  validate(c: FormControl): ValidationErrors {
    if (c.value == undefined || c.value == null || c.value.length == 0) {
      return null;
    }
    const isValid = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(c.value);
    const message = {
      'url': {
        'message': 'The url must be valid (http://XXX.XXX.XXXX)'
      }
    };
    return isValid ? null : message;
  }
}
