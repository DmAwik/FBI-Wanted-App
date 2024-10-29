import { Pipe, PipeTransform } from '@angular/core';
import { ErrorMessagesInterface } from '../../interfaces/error-messages-interface';

@Pipe({
  name: 'getError',
})
export class GetErrorPipe implements PipeTransform {
  transform(value: any, errorTranslation: ErrorMessagesInterface): string {
    const keys: string[] = Object.keys(value);
    return this.getTranslation(keys[0], errorTranslation);
  }

  private getTranslation(errorName: string, errorTranslation: ErrorMessagesInterface): string {
    return errorTranslation[errorName as keyof ErrorMessagesInterface] || errorName;
  }
}
