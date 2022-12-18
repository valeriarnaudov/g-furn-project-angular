import { AuthGuard } from '../shared/guards/auth.activate';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
    data: { title: 'Logout' },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Profile',
    },
  },
  {
    path: 'edit/:id',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
    data: { title: 'Edit Profile' },
  },
];

export const AuthRoutingModule = RouterModule.forChild(routes);
