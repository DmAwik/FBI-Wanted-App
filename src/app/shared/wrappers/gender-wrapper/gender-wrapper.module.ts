import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import 'node_modules/@fortawesome/fontawesome-free/css/all.css';
import { GenderWrapperComponent } from './gender-wrapper.component';

@NgModule({
  declarations: [GenderWrapperComponent],
  imports: [CommonModule, FontAwesomeModule, MatFormFieldModule],
  exports: [GenderWrapperComponent],
})
export class GenderWrapperModule {}
