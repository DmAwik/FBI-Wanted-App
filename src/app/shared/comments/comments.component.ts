import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommentService } from '../services/comment.service';
import { Comment } from '../interfaces/comment-interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() recordId: number = 1;

  public comments: Comment[] = [];

  public static counter: number = 0;

  public commentForm: FormGroup;

  constructor(private fb: FormBuilder, public commentService: CommentService) {
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  public getComments(recordId: number): Observable<Comment[]> {
    return this.commentService.getComments(recordId);
  }

  public addComment(): void {
    if (this.commentForm.valid) {
      const newComment: Comment = {
        id: (CommentsComponent.counter += 1),
        recordId: this.recordId,
        content: this.commentForm.get('content')?.value,
      };

      this.commentService.addComment(newComment).subscribe((comment) => {
        this.comments.push(comment);
        this.commentForm.reset();
      });
    }
  }
}
