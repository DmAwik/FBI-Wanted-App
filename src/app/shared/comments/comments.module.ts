import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './comments.component';

@NgModule({
  declarations: [CommentsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CommentsComponent],
})
export class CommentsModule {}
