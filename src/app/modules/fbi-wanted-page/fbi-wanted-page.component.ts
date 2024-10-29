import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PaginatorService } from 'src/app/shared/services/pagination.service';
import { EditDialogService } from 'src/app/shared/services/edit-dialog.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommentService } from 'src/app/shared/services/comment.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, startWith } from 'rxjs';
import { FbiWantedService } from './services/fbi-wanted-page-service';
import { CustomPaginatorIntl } from './services/custom-paginator-intl-service';
import { WantedItem } from './services/interfaces/fbi-wanted-list-response';
import { columnsData } from './constants/columns-data.constants';
import { ColumnsData } from './services/interfaces/column-data.interface';

@UntilDestroy()
@Component({
  selector: 'app-fbi-wanted-page',
  templateUrl: './fbi-wanted-page.component.html',
  styleUrls: ['./fbi-wanted-page.component.scss'],
  providers: [FbiWantedService, { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FbiWantedPageComponent implements OnInit {
  public form: FormGroup;

  public selectedItem!: WantedItem | null;

  public filteredData: BehaviorSubject<WantedItem[]> = new BehaviorSubject([] as WantedItem[]);

  public titleControl: FormControl = new FormControl('');

  public birthControl: FormControl = new FormControl('');

  public genderControl: FormControl = new FormControl('');

  public columns: ColumnsData[] = columnsData;

  constructor(
    public paginatorService: PaginatorService,
    public editDialogService: EditDialogService,
    public commentService: CommentService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      columnsArray: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.paginatorService.paginatedData$.pipe(untilDestroyed(this)).subscribe((data) => {
      this.selectedItem = data.length > 0 ? data[0] : null;
      this.filteredData.next(data);
    });
    combineLatest([
      this.titleControl.valueChanges.pipe(startWith(this.titleControl.value), untilDestroyed(this)),
      this.birthControl.valueChanges.pipe(startWith(this.birthControl.value), untilDestroyed(this)),
      this.genderControl.valueChanges.pipe(
        startWith(this.genderControl.value),
        untilDestroyed(this),
      ),
    ]).subscribe(() => {
      this.applyFilters();
    });

    this.columns.forEach((column: ColumnsData) => {
      this.columnsArray.push(this.formBuilder.control(column.visible));
    });

    this.columnsArray.valueChanges.subscribe((values: boolean[]) => {
      values.forEach((visible, index) => {
        this.columns[index].visible = !visible;
      });
    });
  }

  public get columnsArray(): FormArray {
    return this.form.get('columnsArray') as FormArray;
  }

  public applyFilters(): void {
    this.paginatorService.paginatedData$.pipe(untilDestroyed(this)).subscribe((data) => {
      const filteredData: WantedItem[] = data.filter((item) => {
        const title = item.title ? item.title.toLowerCase() : '';
        const placeOfBirth = item.placeOfBirth ? item.placeOfBirth.toLowerCase() : '';
        const sex = item.gender ? item.gender.toLowerCase() : '';

        const filters = {
          title: this.titleControl.value ? this.titleControl.value.toLowerCase() : '',
          placeOfBirth: this.birthControl.value ? this.birthControl.value.toLowerCase() : '',
          sex: this.genderControl.value ? this.genderControl.value.toLowerCase() : '',
        };

        const matchesTitle = !filters.title || title.includes(filters.title);
        const matchesPlaceOfBirth =
          !filters.placeOfBirth || placeOfBirth.includes(filters.placeOfBirth);
        const matchesSex = !filters.sex || sex.includes(filters.sex);

        return matchesTitle && matchesPlaceOfBirth && matchesSex;
      });
      this.filteredData.next(filteredData);
    });
  }

  public toggleDetails(item: WantedItem): void {
    this.selectedItem = item;
    this.commentService.getComments(item.id).subscribe((comments) => {
      this.commentService.currentComments$.next(comments);
    });
  }

  public hideDetails(): void {
    this.selectedItem = null;
  }

  public editItem(item: WantedItem): void {
    this.editDialogService.openEditDialog(item);
  }

  public objectKeys(obj: object): string[] {
    return Object.keys(obj);
  }

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
