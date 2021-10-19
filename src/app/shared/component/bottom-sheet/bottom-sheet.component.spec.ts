import { MaterialModule } from './../../material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetComponent } from './bottom-sheet.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { componentFactoryName } from '@angular/compiler';

xdescribe('BottomSheetComponent', () => {
  let component: BottomSheetComponent;
  let fixture: ComponentFixture<BottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomSheetComponent],
      imports: [MaterialModule, MatBottomSheetModule, MatBottomSheetModule],
      providers: [{
        provide: MAT_DIALOG_DATA, useValue: {

        }
      }, { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }, { provide: MatBottomSheetRef, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
