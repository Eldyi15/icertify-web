import { ComponentModule } from './../../../shared/component/component.module';
import { MaterialModule } from './../../../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantProfileRoutingModule } from './merchant-profile-routing.module';
import { MerchantProfileComponent } from './merchant-profile.component';

@NgModule({
  declarations: [MerchantProfileComponent],
  imports: [
    CommonModule,
    MerchantProfileRoutingModule,
    MaterialModule,
    ComponentModule,
  ],
})
export class MerchantProfileModule {}
