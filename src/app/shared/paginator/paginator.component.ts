import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorService } from '../services/pagination.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  constructor(public paginatorService: PaginatorService) {}

  public onPageChange(event: PageEvent): void {
    this.paginatorService.onPageChange(event.pageIndex, event.pageSize);
  }
}
