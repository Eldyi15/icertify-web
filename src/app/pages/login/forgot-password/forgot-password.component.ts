import { OtpService } from './../../../services/otp/otp.service';
import { ActionResultComponent } from './../../../shared/dialogs/action-result/action-result.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilService } from 'src/app/services/util/util.service';
import { OtpComponent } from './../../../shared/component/otp/otp.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  toMatch = false;
  mobileNumber: string = '';
  sending: boolean = false;
  saving: boolean = false;
  page: number = 1;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  credentialPassword = this.fb.group(
    {
      newPassword: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
    },
    {
      validator: this.matchPassword('newPassword', 'passwordConfirm'),
    }
  );
  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    public dialog: MatDialog,
    private util: UtilService,
    private auth: AuthService,
    private otp: OtpService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void { }

  get registerFormControl() {
    return this.credentialPassword.controls;
  }

  matchPassword(newPassword: string, passwordConfirm: string) {
    return (fb: FormGroup) => {
      const newPasswordControl = fb.controls[newPassword];
      const confirmPasswordControl = fb.controls[passwordConfirm];

      if (!newPasswordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (newPasswordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
        this.toMatch = true
      }
      return null;
    };
  }

  sendOTP() {
    this.sending = true;
    let data = {
      mobileNumber: this.mobileNumber,
    };
    this.auth.forgotPassword(data).subscribe(
      (res: any) => {
        console.log(res);
        this.sending = false;
        localStorage.setItem('OTP_TOKEN', res.token);
        if (res) {
          this.dialog
            .open(OtpComponent, {
              panelClass: 'dialog-responsive',
              disableClose: true,
              data: {
                mobileNumber: this.mobileNumber,
              },
            })
            .afterClosed()
            .subscribe((resp: any) => {
              console.log(resp);
              if (resp) {
                this.page = 2;
              }
            });
        }
      },
      (err) => {
        console.log(err);
        this.sending = false;
        this.dialog.open(ActionResultComponent, {
          width: 'auto',
          height: 'auto',
          disableClose: true,
          data: {
            msg: err.error.message || 'Server error! Try Again',
            button: 'Okay',
            success: false,
          },
        });
      }
    );
  }

  forgotPassword() {
    this.saving = true;
    let data = {
      ...this.credentialPassword.getRawValue(),
    };
    console.log(data);
    this.auth.userForgotPassword(data).subscribe(
      (res: any) => {
        console.log(res);
        this.saving = false;
        if (res) {
          this.dialog.open(ActionResultComponent, {
            width: 'auto',
            height: 'auto',
            disableClose: true,
            data: {
              msg: 'Password changed successfully!',
              button: 'Okay',
              success: true,
            },
          });
          this.dialogRef.close();
        }
      },
      (err) => {
        console.log(err);
        this.saving = false;
        this.dialog.open(ActionResultComponent, {
          width: 'auto',
          height: 'auto',
          disableClose: true,
          data: {
            msg: err.error.message || 'Server error! Try Again',
            button: 'Okay',
            success: false,
          },
        });
      }
    );
  }

  pwCheck() { }

  numberInputOnly(event: any) {
    return this.util.formNumberInputOnly(event);
  }
}
