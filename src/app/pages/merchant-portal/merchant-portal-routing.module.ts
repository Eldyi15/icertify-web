import { MerchantPortalComponent } from './merchant-portal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MerchantPortalComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'merchant-dashboard',
      },
      {
        path: 'merchant-dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantPortalRoutingModule {}
