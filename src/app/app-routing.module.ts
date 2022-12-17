import { NotFoundComponent } from './core/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'collection',
    loadChildren: () =>
      import('./collection/collection.module').then((m) => m.CollectionModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { title: 'Not Found' },
  },
  {
    path: '**',
    redirectTo: '/not-found',
    data: { title: 'Not Found' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
