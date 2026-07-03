import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { ROUTES } from '../core/config/routes.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  onLogin(): void {
    this.authService.login('demo-user', 'Usuario Demo');
    void this.router.navigate([ROUTES.DASHBOARD.ROOT]);
  }
}
