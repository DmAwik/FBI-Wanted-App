import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fieldTypeValidator(fieldValueControl: AbstractControl): ValidationErrors | null {
  const fieldType: string = fieldValueControl.parent?.get('fieldType')?.value;
  const fieldValue: string = fieldValueControl.value;

  let isValid: boolean = true;
  switch (fieldType) {
    case 'string':
      break;
    case 'number':
      isValid = !!+fieldValue;
      break;
    case 'boolean':
      isValid = fieldValue.toLowerCase() === 'true' || fieldValue.toLowerCase() === 'false';
      break;
    case 'date':
      isValid = !Number.isNaN(Date.parse(fieldValue));
      break;
    default:
      isValid = false;
  }
  return isValid ? null : { invalidFieldValue: { value: fieldValue } };
}
