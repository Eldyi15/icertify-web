import { MaterialModule } from 'src/app/shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreYouSureComponent } from './are-you-sure/are-you-sure.component';



@NgModule({
  declarations: [
    AreYouSureComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ]
})
export class DialogModule { }
