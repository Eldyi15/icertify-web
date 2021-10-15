import { ComponentModule } from 'src/app/shared/component/component.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'ngx-avatar';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';

@NgModule({
  declarations: [PortalComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialModule,
    ComponentModule,
    AvatarModule,
  ],
})
export class PortalModule {}
