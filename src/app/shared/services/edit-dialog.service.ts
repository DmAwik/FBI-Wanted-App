import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WantedItem } from 'src/app/modules/fbi-wanted-page/services/interfaces/fbi-wanted-list-response';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class EditDialogService {
  public dialogRef: MatDialogRef<EditDialogComponent> | null = null;

  public editedData$: Subject<WantedItem[]> = new Subject<WantedItem[]>();

  constructor(private dialog: MatDialog, private http: HttpClient) {
    this.loadInitialData();
  }

  public getEditedData(): Subject<WantedItem[]> {
    return this.editedData$;
  }

  public loadInitialData(): void {
    this.getEditRequests()
      .pipe(tap((data: any) => this.editedData$.next(data)))
      .subscribe();
  }

  public getСommentsList(): Observable<WantedItem[]> {
    const url = `http://localhost:3000/commentsList`;
    return this.http.get<any[]>(url);
  }

  public getEditRequests(): Observable<WantedItem[]> {
    const url = `http://localhost:3000/editRequests`;
    return this.http.get<WantedItem[]>(url);
  }

  public addEditRequest(editRequest: WantedItem): Observable<WantedItem> {
    const url = `http://localhost:3000/editRequests`;
    return this.http.post<WantedItem>(url, editRequest).pipe(tap(() => this.loadInitialData()));
  }

  public openEditDialog(item: WantedItem): void {
    this.dialogRef = this.dialog.open(EditDialogComponent, {
      width: '1000px',
      data: item,
    });

    this.dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result: WantedItem | null) => {
        if (result) {
          const editedResult: WantedItem = { ...result, isEdited: true };
          this.addEditRequest(editedResult).subscribe(
            (response) => {
              console.log('Edit successfully:', response);
            },
            (error) => {
              console.error('Error edit:', error);
            },
          );
        } else {
          console.log(' without changes');
        }
      });
  }
}
