import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectWrapperComponent } from './select-wrapper.component';
import { GetErrorModule } from '../../pipes/get-error-pipe/get-error-pipe.module';

@NgModule({
  declarations: [SelectWrapperComponent],
  imports: [CommonModule, GetErrorModule, ReactiveFormsModule, FormsModule],
  exports: [SelectWrapperComponent],
})
export class SelectWrapperModule {}
