import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultData',
})
export class DefaultDataPipe implements PipeTransform {
  transform<T extends string | number | Date>(value: T | null): T | string {
    return value !== null ? (value as T) : 'no data available';
  }
}
