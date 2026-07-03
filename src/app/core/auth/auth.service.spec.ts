import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('starts unauthenticated when there is no stored user', () => {
    expect(service.isAuthenticated).toBe(false);
    expect(service.currentUserToken).toBeNull();
  });

  it('authenticates and persists the user on login', () => {
    const user = service.login('user-1', 'Usuario Demo');

    expect(service.isAuthenticated).toBe(true);
    expect(service.currentUserToken).toBe(user.token);
    expect(localStorage.getItem('frontend-angular-example.currentUser')).toContain('user-1');
  });

  it('clears the session on logout', () => {
    service.login('user-1', 'Usuario Demo');
    service.logout();

    expect(service.isAuthenticated).toBe(false);
    expect(localStorage.getItem('frontend-angular-example.currentUser')).toBeNull();
  });

  it('restores a previously stored user on construction', () => {
    localStorage.setItem(
      'frontend-angular-example.currentUser',
      JSON.stringify({ sub: 'user-3', name: 'Restored', token: 'demo-token-user-3' }),
    );

    const restored = new AuthService();

    expect(restored.isAuthenticated).toBe(true);
    expect(restored.currentUserToken).toBe('demo-token-user-3');
  });
});
