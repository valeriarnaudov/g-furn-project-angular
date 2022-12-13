import { ValidatorFn, FormGroup } from '@angular/forms';

export function rePassValidator(
  control1: string,
  control2: string
): ValidatorFn {
  return (control) => {
    const g = control as FormGroup;
    const ctr1 = g.get(control1);
    const ctr2 = g.get(control2);
    return ctr1?.value === ctr2?.value ? null : { rePassValidator: true };
  };
}
