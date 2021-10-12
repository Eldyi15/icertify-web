import { MaterialModule } from './../../../material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnSelectorComponent } from './column-selector.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

xdescribe('ColumnSelectorComponent', () => {
  let component: ColumnSelectorComponent;
  let fixture: ComponentFixture<ColumnSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnSelectorComponent ],
      imports:[MaterialModule],
      providers:[{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
