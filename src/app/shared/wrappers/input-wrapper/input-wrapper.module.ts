import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputWrapperComponent } from './input-wrapper.component';
import { GetErrorModule } from '../../pipes/get-error-pipe/get-error-pipe.module';

@NgModule({
  declarations: [InputWrapperComponent],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, GetErrorModule, MatFormFieldModule],
  exports: [InputWrapperComponent],
})
export class InputWrapperModule {}
