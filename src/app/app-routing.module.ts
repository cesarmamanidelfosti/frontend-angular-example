import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ROUTES } from './core/config/routes.config';

const routes: Routes = [
  { path: '', redirectTo: ROUTES.DASHBOARD.ROOT, pathMatch: 'full' },
  { path: ROUTES.LOGIN, component: LoginComponent },
  {
    path: ROUTES.DASHBOARD.ROOT,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
