import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { vi } from 'vitest';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../auth/auth.service';

function fakeHandle(_req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
  return of({} as HttpEvent<unknown>);
}

describe('AuthInterceptor', () => {
  it('attaches the bearer token when a session exists', () => {
    const authService = { currentUserToken: 'demo-token-user-1' } as AuthService;
    const interceptor = new AuthInterceptor(authService);
    const handle = vi.fn(fakeHandle);
    const request = new HttpRequest('GET', '/api/dashboard');

    interceptor.intercept(request, { handle });

    const forwarded = handle.mock.calls[0][0] as HttpRequest<unknown>;
    expect(forwarded.headers.get('Authorization')).toBe('Bearer demo-token-user-1');
  });

  it('forwards the request unchanged when there is no session', () => {
    const authService = { currentUserToken: null } as AuthService;
    const interceptor = new AuthInterceptor(authService);
    const handle = vi.fn(fakeHandle);
    const request = new HttpRequest('GET', '/api/dashboard');

    interceptor.intercept(request, { handle });

    const forwarded = handle.mock.calls[0][0] as HttpRequest<unknown>;
    expect(forwarded.headers.has('Authorization')).toBe(false);
  });
});
