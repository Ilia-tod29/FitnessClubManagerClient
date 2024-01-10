import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectAuthGuard } from "./guards/protect-auth.guard";
import { IsAuthenticatedUserGuard } from "./guards/is-authenticated-user.guard";
import { HasRoleGuard } from "./guards/has-role.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
    canActivate: [ProtectAuthGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module')
      .then(m => m.HomePageModule),
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module')
      .then(m => m.GalleryModule),
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module')
      .then(m => m.InventoryModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule),
    canActivate: [IsAuthenticatedUserGuard, HasRoleGuard],
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./subscriptions/subscriptions.module')
      .then(m => m.SubscriptionsModule),
    canActivate: [IsAuthenticatedUserGuard],
  },
  { path: '**', redirectTo: '/auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
