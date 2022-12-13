import { ValidatorFn } from '@angular/forms';

export function emptyValidator(): ValidatorFn {
  return (control) => {
    return control.value !== '' ? null : { emptyValidator: true };
  };
}
