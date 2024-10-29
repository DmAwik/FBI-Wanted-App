import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Comment } from '../interfaces/comment-interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = 'http://localhost:3000/commentsList';

  public currentComments$ = new BehaviorSubject<Comment[]>([]);

  constructor(private http: HttpClient) {}

  public getComments(recordId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}?recordId=${recordId}`);
  }

  public addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url, comment).pipe(
      tap((com) => {
        this.currentComments$.next([...this.currentComments$.value, com]);
      }),
    );
  }

  public updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.url}/${comment.id}`, comment);
  }

  public deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${commentId}`);
  }
}
