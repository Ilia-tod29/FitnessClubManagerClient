import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
    // canActivate: [ProtectAuthGuard],
    // canActivateChild: [ProtectAuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module')
      .then(m => m.HomePageModule),
    // canActivate: [ProtectAuthGuard],
    // canActivateChild: [ProtectAuthGuard]
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module')
      .then(m => m.GalleryModule),
    // canActivate: [ProtectAuthGuard],
    // canActivateChild: [ProtectAuthGuard]
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module')
      .then(m => m.InventoryModule),
    // canActivate: [ProtectAuthGuard],
    // canActivateChild: [ProtectAuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule),
    // canActivate: [ProtectAuthGuard],
    // canActivateChild: [ProtectAuthGuard]
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./subscriptions/subscriptions.module')
      .then(m => m.SubscriptionsModule),
    // canActivate: [ProtectAuthGuard],
    // canActivateChild: [ProtectAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
