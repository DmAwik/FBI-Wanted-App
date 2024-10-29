import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeParagraphTag',
})
export class RemoveParagraphTagPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.replace(/<\/?p>/g, '');
  }
}
