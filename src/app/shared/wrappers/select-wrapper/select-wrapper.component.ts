import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
  Injector,
  Input,
  AfterContentInit,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, NgControl, ValidationErrors } from '@angular/forms';
import { startWith } from 'rxjs';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { ErrorMessagesInterface } from '../../interfaces/error-messages-interface';
import { SelectOption } from '../../interfaces/edit-options-interface';

@UntilDestroy()
@Component({
  selector: 'app-select-wrapper',
  templateUrl: './select-wrapper.component.html',
  styleUrls: ['./select-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectWrapperComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWrapperComponent implements OnInit, AfterContentInit {
  @Input() options: SelectOption[] = [];

  @Input() value: string | undefined;

  @Input() errorMessages: ErrorMessagesInterface = {};

  @Input() placeholder: string = '';

  public control: FormControl = new FormControl();

  public ngControl!: NgControl;

  public currentErrors: null | ValidationErrors | undefined = null;

  public onChange: any = (): void => {};

  public onTouched: any = (): void => {};

  constructor(private injector: Injector, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.onChange(value);
    });
  }

  public ngAfterContentInit(): void {
    this.ngControl = this.injector.get(NgControl);
    this.ngControl.control?.statusChanges
      .pipe(startWith(this.ngControl?.control.status), untilDestroyed(this))
      .subscribe(() => {
        this.currentErrors = this.ngControl?.control?.errors;
        this.cdr.markForCheck();
      });
  }

  public writeValue(value: any): void {
    this.control.setValue(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onBlur(): void {
    this.onTouched();
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
