import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { FbiWantedService } from 'src/app/modules/fbi-wanted-page/services/fbi-wanted-page-service';
import { WantedItem } from 'src/app/modules/fbi-wanted-page/services/interfaces/fbi-wanted-list-response';
import { pageSizeOptions } from '../constants/fbi-wanted-page-constants';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  public currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public pageSize$: BehaviorSubject<number> = new BehaviorSubject<number>(10);

  public pageSizeOptions: number[] = pageSizeOptions;

  public paginatedData$: Observable<WantedItem[]>;

  public totalItems = 0;

  constructor(private fbiWantedService: FbiWantedService) {
    this.paginatedData$ = this.currentPage$.pipe(
      switchMap((page) =>
        this.pageSize$.pipe(
          switchMap((size) => this.fbiWantedService.getWantedList(page, size)),
          tap((response) => {
            this.totalItems = response.total;
          }),
          map((response) => response.items),
        ),
      ),
    );
  }

  public onPageChange(pageIndex: number, pageSize: number): void {
    this.currentPage$.next(pageIndex);
    this.pageSize$.next(pageSize);
  }
}
