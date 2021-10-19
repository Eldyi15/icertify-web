import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from './../../../shared/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

fdescribe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authService: AuthService


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MaterialModule, FormsModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid if new password and confirm password mismatched', () => {
    component.credentialPassword.setValue({
      newPassword: 'newPassword',
      passwordConfirm: 'differentPassword'
    })
    expect(component.credentialPassword.valid).toBeFalse()
  })

  it('should be able to send otp', () => {
    spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    spyOn(authService, 'forgotPassword').and.callThrough().and.returnValue(of({}))
    component.sendOTP()
    expect(component.dialog).toBeDefined()
    expect(component.page).toBe(2)
  });

})
