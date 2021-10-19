import { MaterialModule } from './../../material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpComponent } from './otp.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('OtpComponent', () => {
  let component: OtpComponent;
  let fixture: ComponentFixture<OtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
