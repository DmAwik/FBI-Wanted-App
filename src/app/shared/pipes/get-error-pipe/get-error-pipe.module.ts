import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GetErrorPipe } from './get-error-pipe';

@NgModule({
  declarations: [GetErrorPipe],
  imports: [ReactiveFormsModule],
  exports: [GetErrorPipe],
})
export class GetErrorModule {}
