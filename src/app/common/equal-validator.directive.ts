import { Directive, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms'

@Directive({
  selector: '[equalValidator][formControlName],[equalValidator][formControl],[equalValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true }
  ]
})
 
export class EqualValidatorDirective implements Validator {
  constructor( @Attribute('equalValidator') public equalValidator: string) {

  }

  validate(control: AbstractControl): { [key: string]: any; } {
    let controlValue = control.value;

    let controlToCompare = control.root.get(this.equalValidator);

    if (controlToCompare && controlValue !== controlToCompare.value) {
      return { validateEqual: false }
    }

    return null;
  }
}
