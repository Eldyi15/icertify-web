import { TableOutput } from 'src/app/models/tableemit.interface';
import { TABLE_MERCHANT_DATA } from './../../../config/KARMA_TESTING';
import { Column } from './../../../models/column.interface';
import { BottomSheetComponent } from './../bottom-sheet/bottom-sheet.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';

import { TableComponent } from './table.component';

xdescribe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [MaterialModule, HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.columns = [
      {
        title: 'First Name',
        path: 'firstName',
        breakpoint: 'xs',
        type: 'text',
        selected: true,
      },
      {
        title: 'Last Name',
        path: 'lastName',
        breakpoint: 'xs',
        type: 'text',
        selected: true,
      },
      {
        title: 'Email',
        path: 'email',
        breakpoint: 'xs',
        type: 'text',
        selected: true,
      },
      {
        title: 'Mobile Number',
        path: 'mobileNumber',
        breakpoint: 'xs',
        type: 'text',
        selected: true,
      },
      {
        title: 'Status',
        path: 'status',
        breakpoint: 'xs',
        type: 'text',
        selected: true,
      },
    ]
    component.dataSource = TABLE_MERCHANT_DATA

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should be', () => {
    console.log(component.columns, "HERERERRERE")
  });
});
