import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let authService: AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [MaterialModule, ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService)
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('won\'t enable save password button if one of the field is empty or more', (() => {
    component.passwordForm.setValue({
      newPassword: '123qweasdzxc123',
      passwordConfirm: '123qweasdzxc123',
    });
    component.pwCheck();
    expect(component.pwError).toBeTrue();
  }));

  it('should not register if the new password and password confirm are not same', () => {
    component.passwordForm.setValue({
      newPassword: '123qweasdzxc123',
      passwordConfirm: '123qweasdzxc123',
    });
    component.matchPassword(component.passwordForm.value.newPassword, component.passwordForm.value.passwordConfirm);
    expect(component.toMatch).toBeTrue();
  });
});