import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { ColumnSelectorComponent } from './table/column-selector/column-selector.component';
import { LoadingComponent } from './loading/loading.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
    ColumnSelectorComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TableComponent,
    FormComponent,
    LoadingComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentModule {}
