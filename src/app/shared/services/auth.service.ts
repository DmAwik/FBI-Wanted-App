import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserInterface } from '../interfaces/user-interface';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public users!: UserInterface[];

  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private currentUserKey: string = 'currentUser';

  constructor(private http: HttpClient) {}

  public loadUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>('assets/users.json');
  }

  public onLoadUsers(): void {
    this.loadUsers()
      .pipe(untilDestroyed(this))
      .subscribe((users: UserInterface[]) => {
        this.users = users;
      });
  }

  public login(username: string, password: string): void {
    const user = this.users.find((u) => u.login === username && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      this.isLoggedIn$.next(true);
    }
  }

  public logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.isLoggedIn$.next(false);
  }
}
