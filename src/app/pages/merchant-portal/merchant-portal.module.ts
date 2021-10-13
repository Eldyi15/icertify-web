import { ComponentModule } from 'src/app/shared/component/component.module';
import { MaterialModule } from './../../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantPortalRoutingModule } from './merchant-portal-routing.module';
import { MerchantPortalComponent } from './merchant-portal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MerchantPortalComponent],
  imports: [
    CommonModule,
    MerchantPortalRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
  ],
})
export class MerchantPortalModule {}
