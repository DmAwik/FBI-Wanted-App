import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultDataPipe } from './default-data-pipe';

@NgModule({
  declarations: [DefaultDataPipe],
  imports: [ReactiveFormsModule],
  exports: [DefaultDataPipe],
})
export class DefaultDataPipeModule {}
