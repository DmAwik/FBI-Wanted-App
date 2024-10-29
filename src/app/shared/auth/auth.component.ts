import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from '../services/auth.service';
import { errorTranslations } from '../constants/errors-constants';
import { ErrorMessagesInterface } from '../interfaces/error-messages-interface';

@UntilDestroy()
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  public isNotLoginError: boolean = true;

  public myForm: FormGroup;

  public errorTranslations: ErrorMessagesInterface = errorTranslations;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private dialogRef: MatDialogRef<AuthComponent>,
  ) {
    this.myForm = this.formBuilder.group({
      userLogin: ['', Validators.required],
      userPassword: ['', Validators.required],
    });
  }

  public submit(): void {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
    } else {
      const userLoginValue: string = this.myForm.get('userLogin')?.value;
      const userPasswordValue: string = this.myForm.get('userPassword')?.value;
      this.authService.login(userLoginValue, userPasswordValue);
      if (this.authService.isLoggedIn$.value) {
        this.closeDialog();
      } else {
        this.isNotLoginError = false;
      }
    }
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
