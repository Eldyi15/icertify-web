import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../shared/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [MaterialModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: MatDialogRef, useValue: {} }]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  // it('should not register if the new password and password confirm are not same', () => {
  //   component.credentialPassword.setValue({
  //     newPassword: '123qweasdzxc123',
  //     passwordConfirm: '123qweasdzxc123',
  //   });
  //   component.matchPassword(component.credentialPassword.value.newPassword, component.credentialPassword.value.passwordConfirm);
  //   expect(component.toMatch).toBeTrue();
  // });
});
