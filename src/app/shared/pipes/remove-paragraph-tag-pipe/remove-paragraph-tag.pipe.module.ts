import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RemoveParagraphTagPipe } from './remove-paragraph-tag.pipe';

@NgModule({
  declarations: [RemoveParagraphTagPipe],
  imports: [ReactiveFormsModule],
  exports: [RemoveParagraphTagPipe],
})
export class RemoveParagraphTagPipeModule {}
