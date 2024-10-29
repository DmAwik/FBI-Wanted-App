import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private dialog: MatDialog, public authService: AuthService) {}

  public login(): void {
    this.dialog.open(AuthComponent, {
      autoFocus: false,
    });

    this.authService.onLoadUsers();
  }

  public logout(): void {
    this.authService.logout();
  }
}
