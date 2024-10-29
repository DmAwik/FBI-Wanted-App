import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function duplicateFieldNameValidator(firstFormGroup: AbstractControl): ValidatorFn {
  return (formControl: AbstractControl): ValidationErrors | null => {
    const fieldsFromFirstFormGroup = Object.keys(firstFormGroup.value);

    const duplicateFieldNames: boolean = fieldsFromFirstFormGroup.some(
      (value: string) => value === formControl.value,
    );

    return duplicateFieldNames ? { duplicateFieldName: true } : null;
  };
}
