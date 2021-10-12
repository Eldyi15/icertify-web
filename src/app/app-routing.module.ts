import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'admin-login',
    loadChildren: () =>
      import('./pages/admin-login/admin-login.module').then(
        (m) => m.AdminLoginModule
      ),
  },
  {
    path: 'admin-portal',
    loadChildren: () =>
      import('./pages/admin-portal/admin-portal.module').then(
        (m) => m.AdminPortalModule
      ),
  },
  {
    path: 'merchant-portal',
    loadChildren: () =>
      import('./pages/merchant-portal/merchant-portal.module').then(
        (m) => m.MerchantPortalModule
      ),
  },
  {
    path: 'portal',
    loadChildren: () =>
      import('./pages/portal/portal.module').then((m) => m.PortalModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
