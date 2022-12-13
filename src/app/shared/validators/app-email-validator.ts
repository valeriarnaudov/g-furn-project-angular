import { ValidatorFn } from '@angular/forms';

export function appEmailValidator(): ValidatorFn {
  const regexp = new RegExp(`^[^@]{4,}@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$`);
  return (control) => {
    return control.value === '' || regexp.test(control.value)
      ? null
      : { appEmailValidator: true };
  };
}
