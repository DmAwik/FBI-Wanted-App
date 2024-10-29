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

@UntilDestroy()
@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputWrapperComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputWrapperComponent implements OnInit, AfterContentInit {
  @Input() value: string | number | Date | undefined;

  @Input() errorMessages: ErrorMessagesInterface = {};

  @Input() checked: boolean = false;

  @Input() type: string = 'text';

  @Input() placeholder: string = '';

  public control: FormControl = new FormControl();

  public ngControl!: NgControl;

  public currentErrors: null | ValidationErrors | undefined = null;

  public onChange: any = () => {};

  public onTouched: any = () => {};

  constructor(private injector: Injector, private cdr: ChangeDetectorRef) {}

  public ngAfterContentInit(): void {
    this.ngControl = this.injector.get(NgControl);
    this.ngControl.control?.statusChanges
      .pipe(startWith(this.ngControl?.control.status), untilDestroyed(this))
      .subscribe(() => {
        this.currentErrors = this.ngControl?.control?.errors;
        this.cdr.markForCheck();
      });
  }

  public ngOnInit(): void {
    this.control = new FormControl('');
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      if (this.type === 'checkbox') {
        this.onChange(this.checked);
      } else {
        this.onChange(value);
      }
    });
  }

  public writeValue(value: any): void {
    this.control?.setValue(value);
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

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control?.disable();
    } else {
      this.control?.enable();
    }
  }
}
