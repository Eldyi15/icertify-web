import { OtpService } from './../../../services/otp/otp.service';
import { MaterialModule } from './../../material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateViewComponent } from './update-view.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


describe('UpdateViewComponent', () => {
  let component: UpdateViewComponent;
  let fixture: ComponentFixture<UpdateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateViewComponent],
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});