import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { vi } from 'vitest';
import { LoginComponent } from './login.component';
import { AuthService } from '../core/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let router: Router;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [LoginComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('logs the demo user in and navigates to the dashboard', () => {
    const authService = TestBed.inject(AuthService);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.onLogin();

    expect(authService.isAuthenticated).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard']);
  });
});
