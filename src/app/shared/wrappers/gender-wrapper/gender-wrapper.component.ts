import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gender-wrapper',
  templateUrl: './gender-wrapper.component.html',
  styleUrls: ['./gender-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenderWrapperComponent),
      multi: true,
    },
  ],
})
export class GenderWrapperComponent implements ControlValueAccessor, OnDestroy {
  public parts: FormControl[] = [];

  public stateChanges: Subject<void> = new Subject<void>();

  public focused: boolean = false;

  public value!: string;

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public placeholder!: string;

  public ngControl!: NgControl | null;

  public disabled!: boolean;

  public ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  public writeValue(value: string): void {
    this.value = value;
    this.stateChanges.next();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setValue(sex: string): void {
    this.value = sex;
    this.onChange(sex);
    this.onTouch();
    this.stateChanges.next();
    if (this.ngControl) {
      this.ngControl.control?.setValue(sex);
      this.ngControl.control?.markAsTouched();
    }
  }

  public onChange: any = () => {};

  public onTouch: any = () => {};
}
