import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WantedItem } from '../../modules/fbi-wanted-page/services/interfaces/fbi-wanted-list-response';
import { duplicateFieldNameValidator } from '../validators/duplicate-field-name.validator';
import { fieldTypeValidator } from '../validators/field-type.validator';
import { ErrorMessagesInterface } from '../interfaces/error-messages-interface';
import { editFieldsErrors } from '../constants/errors-constants';
import { selectEditOptions } from '../constants/select-edit-options-constants';
import { SelectOption } from '../interfaces/edit-options-interface';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialogComponent {
  public firstFormGroup: FormGroup;

  public secondFormGroup: FormGroup;

  public selectEditOptions: SelectOption[] = selectEditOptions;

  public editFieldsErrors: ErrorMessagesInterface = editFieldsErrors;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: WantedItem,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private cdr: ChangeDetectorRef,
  ) {
    this.firstFormGroup = this.formBuilder.group({
      title: [data.title],
      images: [data.images],
      ageMin: [data.ageMin],
      ageMax: [data.ageMax],
      dateOfBirth: [data.dateOfBirth],
      heightMin: [data.heightMin],
      heightMax: [data.heightMax],
      weight: [data.weight],
      sex: [data.gender],
      placeOfBirth: [data.placeOfBirth],
      nationality: [data.nationality],
      caution: [data.caution],
      description: [data.description],
      scarsAndMarks: [data.scarsAndMarks],
      race: [data.race],
      files: [data.files],
    });

    this.secondFormGroup = this.formBuilder.group({
      fields: this.formBuilder.array([]),
    });
  }

  public get fields(): FormArray {
    return this.secondFormGroup.get('fields') as FormArray;
  }

  public addField(): void {
    const fieldGroup = this.formBuilder.group({
      fieldName: ['', [Validators.required, duplicateFieldNameValidator(this.firstFormGroup)]],
      fieldType: ['', Validators.required],
      fieldValue: ['', [Validators.required, fieldTypeValidator]],
    });

    this.fields.push(fieldGroup);
  }

  public removeField(index: number): void {
    this.fields.removeAt(index);
  }

  public editField(index: number): void {
    const field: AbstractControl = this.fields.at(index);
    field.get('fieldName')?.setValue('');
    field.get('fieldType')?.setValue('');
  }

  public onSave(): void {
    if (this.secondFormGroup.valid && this.firstFormGroup.valid) {
      const updatedData: WantedItem = this.firstFormGroup.value;

      this.fields.controls.forEach((fieldControl) => {
        const fieldName: string = fieldControl.get('fieldName')?.value;
        const fieldValue: string = fieldControl.get('fieldValue')?.value;

        updatedData[fieldName] = fieldValue;
      });

      this.dialogRef.close(updatedData);
    }
  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }
}
