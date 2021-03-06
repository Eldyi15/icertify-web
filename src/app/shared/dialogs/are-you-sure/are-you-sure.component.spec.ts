import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreYouSureComponent } from './are-you-sure.component';

describe('AreYouSureComponent', () => {
  let component: AreYouSureComponent;
  let fixture: ComponentFixture<AreYouSureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreYouSureComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: { msg: 'msg' } }, { provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreYouSureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read data pass from previous component', () => {
    // component.data = undefined
    expect(component.data).not.toBeUndefined()
  })
});
