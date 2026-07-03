import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthUser {
  sub: string;
  name: string;
  token: string;
}

const STORAGE_KEY = 'frontend-angular-example.currentUser';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSubject = new BehaviorSubject<AuthUser | null>(this.readStoredUser());

  readonly currentUser$: Observable<AuthUser | null> = this.currentUserSubject.asObservable();

  get isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  get currentUserToken(): string | null {
    return this.currentUserSubject.value?.token ?? null;
  }

  login(sub: string, name: string): AuthUser {
    const user: AuthUser = { sub, name, token: `demo-token-${sub}` };
    this.currentUserSubject.next(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private readStoredUser(): AuthUser | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }
}
