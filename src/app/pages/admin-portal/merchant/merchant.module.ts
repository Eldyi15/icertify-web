import { MaterialModule } from './../../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantComponent } from './merchant.component';
import { AddMerchantComponent } from './add-merchant/add-merchant.component';
import { ComponentModule } from 'src/app/shared/component/component.module';

@NgModule({
  declarations: [MerchantComponent, AddMerchantComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule,
  ],
})
export class MerchantModule {}
