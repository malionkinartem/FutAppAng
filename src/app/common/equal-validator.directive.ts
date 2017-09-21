import { Directive, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms'

@Directive({
  selector: '[futEqualValidator][formControlName],[futEqualValidator][formControl],[futEqualValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true }
  ]
})

export class EqualValidatorDirective implements Validator {
  constructor( @Attribute('futEqualValidator') public equalValidator: string) {

  }

  validate(control: AbstractControl): { [key: string]: any; } {

    const controlValue = control.value;
    const controlToCompare = control.root.get(this.equalValidator);

    if (controlToCompare && controlValue !== controlToCompare.value) {
      return { validateEqual: false }
    }

    return null;
  }
}
