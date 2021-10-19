import { ActionResultComponent } from './../../dialogs/action-result/action-result.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AreYouSureComponent } from '../../dialogs/are-you-sure/are-you-sure.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  pwError = false;
  hideCurrent: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isSaving = false;
  saving = false;
  loading = false;
  toMatch = false;
  passwordForm = this.fb.group(
    {
      newPassword: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
    },
    {
      validator: this.matchPassword('newPassword', 'passwordConfirm'),
    }
  );

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private fb: FormBuilder,
    private auth: AuthService,
    private sb: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.passwordForm);
  }

  get registerFormControl() {
    return this.passwordForm.controls;
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
        this.toMatch = true
        confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }

  pwCheck() {
    let dataCredential = {
      newPassword: this.passwordForm.getRawValue().newPassword,
      passwordConfirm: this.passwordForm.getRawValue().passwordConfirm,
    };

    if (dataCredential.newPassword && dataCredential.passwordConfirm) {
      this.pwError = true;
    } else {
      this.pwError = false;
    }
  }

  onSubmit() {
    this.dialog
      .open(AreYouSureComponent, {
        width: 'auto',
        height: 'auto',
        data: {
          header: 'Before you proceed...',
          msg: `set this as your new password`,
        },
      })
      .afterClosed()
      .subscribe((response: any) => {
        if (response) {
          this.save();
        }
      });
  }

  save() {
    this.saving = true;
    let dataCredential = {
      newPassword: this.passwordForm.getRawValue().newPassword,
      passwordConfirm: this.passwordForm.getRawValue().passwordConfirm,
    };
    this.isSaving = true;
    this.auth.changePassword(dataCredential).subscribe(
      (res: any) => {
        this.dialog
          .open(ActionResultComponent, {
            width: 'auto',
            height: 'auto',
            disableClose: true,
            data: {
              msg: 'Password Changed Successfully!',
              success: true,
              button: 'Got it',
            },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) {
              // Insert logout here!!!!!
              this.auth.logout().subscribe((res) => {
                console.log(res);
                localStorage.removeItem('SESSION_CSURF_TOKEN');
                localStorage.removeItem('SESSION_AUTH');
                this.dialogRef.close();
                this.router.navigate(['/login']);
              });
            }
          });
      },
      (err: any) => {
        this.saving = false;
        this.dialog.open(ActionResultComponent, {
          width: 'auto',
          height: 'auto',
          disableClose: true,
          data: {
            msg: err.message || 'Server Error, Please try again',
            success: false,
            button: 'Close',
          },
        });
      }
    );
  }
}
