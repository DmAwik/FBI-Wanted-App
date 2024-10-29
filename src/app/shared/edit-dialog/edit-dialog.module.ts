import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { EditDialogComponent } from './edit-dialog.component';
import { GenderWrapperModule } from '../wrappers/gender-wrapper/gender-wrapper.module';
import { InputWrapperModule } from '../wrappers/input-wrapper/input-wrapper.module';
import { SelectWrapperModule } from '../wrappers/select-wrapper/select-wrapper.module';

@NgModule({
  declarations: [EditDialogComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    GenderWrapperModule,
    InputWrapperModule,
    SelectWrapperModule,
  ],
  exports: [EditDialogComponent],
})
export class EditDialogModule {}
