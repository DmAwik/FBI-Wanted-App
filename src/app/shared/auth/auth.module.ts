import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthComponent } from './auth.component';
import { InputWrapperModule } from '../wrappers/input-wrapper/input-wrapper.module';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    InputWrapperModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [AuthComponent],
  providers: [AuthService],
})
export class AuthModule {}
