import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {OnboardingComponent} from './components/onboarding/onboarding.component';
import {RegisterComponent} from './components/register/register.component';
import { AdminLayoutHrComponent } from './layouts/admin-layout-hr/admin-layout-hr.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const AppRoutes: Routes = [
  {
    path: 'employee',
    redirectTo: 'employee/dashboard',
    pathMatch: 'full',
  }, {
    path: 'employee',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: 'hr',
    redirectTo: 'hr/dashboard',
    pathMatch: 'full',
  }, {
    path: 'hr',
    component: AdminLayoutHrComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout-hr/admin-layout-hr.module#AdminLayoutHrModule'
  }]},
  {path: 'login', component: LoginComponent},
  // {
  //   path: '**',
  //   redirectTo: 'login'
  // },
  {path: 'register', component: RegisterComponent},
  {path: 'onboarding', component: OnboardingComponent},
  {path: '', component: LoginComponent}

]
