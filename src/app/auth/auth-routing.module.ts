import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthActivate],
    data: { title: 'Login', loginRequired: false },
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [AuthActivate],
    data: { title: 'Register', loginRequired: false },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    // canActivate: [AuthActivate],
    data: { title: 'Logout', loginRequired: true },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    // canActivate: [AuthActivate],
    data: { title: 'Profile', loginRequired: true },
  },
  {
    path: 'edit/:id',
    component: EditProfileComponent,
    // canActivate: [AuthActivate],
    data: { title: 'Profile', loginRequired: true },
  },
];

export const AuthRoutingModule = RouterModule.forChild(routes);
