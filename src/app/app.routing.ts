import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {OnboardingComponent} from './components/onboarding/onboarding.component';
import {RegisterComponent} from './components/register/register.component';
import { AdminLayoutHrComponent } from './layouts/admin-layout-hr/admin-layout-hr.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {AdminGuard, AuthGuard, LoginGuard, LogoutGuard} from './guards';

export const AppRoutes: Routes = [
  {
    path: 'employee',
    redirectTo: 'employee/dashboard',
    pathMatch: 'full',
  },

  {
    path: 'employee',
    component: AdminLayoutComponent,
    canActivate: [LoginGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},

  {
    path: 'hr',
    redirectTo: 'hr/dashboard',
    pathMatch: 'full',
  },

  {
    path: 'hr',
    component: AdminLayoutHrComponent,
    canActivate: [LoginGuard, AdminGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout-hr/admin-layout-hr.module#AdminLayoutHrModule'
  }]},
  {path: 'onboarding', component: OnboardingComponent, canActivate: [LoginGuard]},
  {path: '', component: LoginComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  // {
  //   path: '**',
  //   redirectTo: 'login'
  // },
  {path: 'register', component: RegisterComponent},
  {path: 'logout', canActivate: [LogoutGuard], component: LoginComponent}
]
