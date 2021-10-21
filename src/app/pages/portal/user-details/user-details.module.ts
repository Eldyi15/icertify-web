import { ComponentModule } from 'src/app/shared/component/component.module';
import { MaterialModule } from './../../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';

@NgModule({
  declarations: [UserDetailsComponent, UpdateDetailsComponent],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ComponentModule,
  ],
})
export class UserDetailsModule {}
