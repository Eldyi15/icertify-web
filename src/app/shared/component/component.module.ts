import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { ColumnSelectorComponent } from './table/column-selector/column-selector.component';
import { LoadingComponent } from './loading/loading.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OtpComponent } from './otp/otp.component';
import { AreYouSureComponent } from '../dialogs/are-you-sure/are-you-sure.component';

@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
    ColumnSelectorComponent,
    LoadingComponent,
    ChangePasswordComponent,
    OtpComponent,
    AreYouSureComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [
    MaterialModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    TableComponent,
    FormComponent,
    LoadingComponent,
    OtpComponent,
    ChangePasswordComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentModule {}
