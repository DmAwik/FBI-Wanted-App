import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from 'src/app/shared/comments/comments.component';
import { UnsavedChangesGuard } from 'src/app/shared/guards/unsaved-changed-guard';
import { FbiWantedPageComponent } from './fbi-wanted-page.component';

const routes: Routes = [
  {
    path: '',
    component: FbiWantedPageComponent,
    children: [
      {
        path: 'comments/:id',
        component: CommentsComponent,
        canDeactivate: [UnsavedChangesGuard],
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FbiWantedRoutingModule {}
