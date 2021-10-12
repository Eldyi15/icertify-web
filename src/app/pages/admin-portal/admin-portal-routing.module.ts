import { AdminPortalComponent } from './admin-portal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminPortalComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-dashboard',
      },
      {
        path: 'admin-dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'merchant',
        loadChildren: () =>
          import('./merchant/merchant.module').then((m) => m.MerchantModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPortalRoutingModule {}
