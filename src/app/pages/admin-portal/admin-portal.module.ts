import { ComponentModule } from './../../shared/component/component.module';
import { MaterialModule } from './../../shared/material.module';
import { AvatarModule } from 'ngx-avatar';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPortalRoutingModule } from './admin-portal-routing.module';
import { AdminPortalComponent } from './admin-portal.component';

@NgModule({
  declarations: [AdminPortalComponent],
  imports: [
    CommonModule,
    AdminPortalRoutingModule,
    ComponentModule,
    AvatarModule,
  ],
})
export class AdminPortalModule { }
