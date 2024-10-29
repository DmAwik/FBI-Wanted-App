import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { DefaultDataPipeModule } from 'src/app/shared/pipes/default-data-pipe/default-data-pipe.module';
import { RemoveParagraphTagPipeModule } from 'src/app/shared/pipes/remove-paragraph-tag-pipe/remove-paragraph-tag.pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PaginatorModule } from 'src/app/shared/paginator/paginator.module';
import { EditDialogModule } from 'src/app/shared/edit-dialog/edit-dialog.module';
import { MatIconModule } from '@angular/material/icon';
import { CommentsModule } from 'src/app/shared/comments/comments.module';
import { FbiWantedPageComponent } from './fbi-wanted-page.component';
import { FbiWantedRoutingModule } from './fbi-wanted-page-routing.module';
import { InputWrapperModule } from '../../shared/wrappers/input-wrapper/input-wrapper.module';

@NgModule({
  declarations: [FbiWantedPageComponent],
  exports: [FbiWantedPageComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatListModule,
    FormsModule,
    DefaultDataPipeModule,
    FbiWantedRoutingModule,
    RemoveParagraphTagPipeModule,
    ReactiveFormsModule,
    InputWrapperModule,
    PaginatorModule,
    MatTabsModule,
    EditDialogModule,
    MatIconModule,
    DragDropModule,
    CommentsModule,
  ],
})
export class FbiWantedPageModule {}
