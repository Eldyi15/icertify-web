import { ActionResultComponent } from './../dialogs/action-result/action-result.component';
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
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { UpdateViewComponent } from './update-view/update-view.component';
import { ImageFormComponent } from './image-form/image-form.component';
import { OtpComponent } from './otp/otp.component';
import { AreYouSureComponent } from '../dialogs/are-you-sure/are-you-sure.component';
import { UploadComponent } from './upload/upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { AvatarModule } from 'ngx-avatar';
import { LogoutLoaderComponent } from './logout-loader/logout-loader.component';

@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
    ColumnSelectorComponent,
    LoadingComponent,
    ChangePasswordComponent,
    BottomSheetComponent,
    UpdateViewComponent,
    ImageFormComponent,
    OtpComponent,
    AreYouSureComponent,
    ActionResultComponent,
    UploadComponent,
    ProfileMenuComponent,
    LogoutLoaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    AvatarModule,
    NgxFileDropModule,
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
    ActionResultComponent,
    ImageFormComponent,
    ProfileMenuComponent,
    NgxFileDropModule,
    LogoutLoaderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentModule {}
