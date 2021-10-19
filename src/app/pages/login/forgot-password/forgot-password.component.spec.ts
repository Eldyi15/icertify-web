import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from './../../../shared/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable, throwError } from 'rxjs';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authService: AuthService


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MaterialModule, FormsModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: { close: () => { } } }]
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
  it('should be able to call forgotPassword subscription and close the forgot Password dialog if successful', () => {
    let resp = spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    spyOn(authService, 'userForgotPassword').and.callThrough().and.returnValue(of({}))
    spyOn(component.dialogRef, 'close').and.returnValue()
    component.forgotPassword()
    expect(component.dialog).toBeDefined()
    expect(component.dialogRef.close).toHaveBeenCalled()
  })
  // it('should be able to call forgotPassword subscription and throws an error if theres an error with subscriptions', () => {
  //   spyOn(component.dialog, 'open')
  //     .and
  //     .returnValue({
  //       afterClosed: () => of(true)
  //     } as MatDialogRef<typeof component>);
  //   let resp = spyOn(authService, 'userForgotPassword').and.callThrough().and.returnValue(throwError({
  //     error: {
  //       status: 404,
  //       message: 'KARMA TEST THROW ERROR'
  //     }
  //   }))
  //   component.forgotPassword()
  //   // expect(resp).()
  //   console.log(resp, "HERE")
  //   expect(resp).toBeDefined()
  // })

})
