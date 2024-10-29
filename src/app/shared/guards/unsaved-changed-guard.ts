import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentsComponent } from '../comments/comments.component';

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<CommentsComponent> {
  public canDeactivate(component: CommentsComponent): Observable<boolean> | boolean {
    if (component.commentForm.dirty) {
      // eslint-disable-next-line no-restricted-globals
      return confirm('Вы хотите покинуть страницу без сохранения изменений в комментариях?');
    }
    return true;
  }
}
