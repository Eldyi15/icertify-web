import { MOCK_TABLE_COLUMNS } from './../../../../config/KARMA_TESTING';
import { MaterialModule } from './../../../material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnSelectorComponent } from './column-selector.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ColumnSelectorComponent', () => {
  let component: ColumnSelectorComponent;
  let fixture: ComponentFixture<ColumnSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnSelectorComponent],
      imports: [MaterialModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: { columns: MOCK_TABLE_COLUMNS } }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSelectorComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();


  });

  it('should toggle selected column', () => {
    let index = component.columns.findIndex(i => i.title === "Status")

    component.filterColumn(index)

    expect(component.columns[index].selected).toBeTrue()
  })
});
