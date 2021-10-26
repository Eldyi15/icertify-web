import { MerchantProfileComponent } from './merchant-profile.component';
import { MerchantComponent } from './../../admin-portal/merchant/merchant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MerchantProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantProfileRoutingModule {}
