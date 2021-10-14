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
    private dialog: MatDialog
  ) {}

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
        confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }

  pwCheck() {
    let dataCredential = {
      newPassword: this.passwordForm.getRawValue().newPassword,
      passwordConfirm: this.passwordForm.getRawValue().confirmPassword,
    };

    if (dataCredential.newPassword || dataCredential.passwordConfirm) {
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
      passwordConfirm: this.passwordForm.getRawValue().confirmPassword,
    };
    this.isSaving = true;
    this.auth.changePassword(dataCredential).subscribe(
      (res: any) => {
        this.sb.open('Password Successfully Saved', undefined, {
          panelClass: ['success'],
          duration: 1500,
        });
        this.dialogRef.close(true);
      },
      (err: any) => {
        console.log(err);
        this.sb.open(err.error.message, 'Got it', {
          panelClass: ['failed'],
          duration: 3500,
        });
        this.saving = false;
      }
    );
  }
}
