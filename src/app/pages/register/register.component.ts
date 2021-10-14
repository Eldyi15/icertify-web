import { OtpComponent } from './../../shared/component/otp/otp.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterFormUser } from 'src/app/models/register.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  isRegistered = false;
  showPassword: boolean = false;
  registerForm = this.fb.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    // middleName: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl(''),
    mobileNumber: new FormControl('', [Validators.required]),
  });

  mobileNumber = this.registerForm.getRawValue().mobileNumber;
  constructor(
    private sb: MatSnackBar,
    private fb: FormBuilder,
    private auth: AuthService,
    private util: UtilService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  sendOtp() {
    let config: MatDialogConfig = {
      panelClass: 'dialog-responsive',
      disableClose: true,
      data: {
        mobileNumber: this.registerForm.getRawValue().mobileNumber,
      },
    };
    this.dialog
      .open(OtpComponent, config)
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.register();
      });
  }

  register() {
    this.loading = true;
    // set body
    let body: RegisterFormUser = {
      firstName: this.registerForm.getRawValue().firstName,
      lastName: this.registerForm.getRawValue().lastName,
      email: this.registerForm.getRawValue().email,
      password: this.registerForm.getRawValue().password,
      passwordConfirm: this.registerForm.getRawValue().passwordConfirm,
      mobileNumber: '+63' + this.registerForm.getRawValue().mobileNumber,
      status: 'Pending',
    };

    if (
      !this.registerForm.getRawValue().mobileNumber.startsWith('9') ||
      this.registerForm.getRawValue().mobileNumber.length !== 10
    ) {
      this.loading = false;
      this.sb.open('Invalid mobile number!', 'Okay!', {
        duration: 5000,
        panelClass: ['failed'],
      });
      return;
    }
    if (
      !(
        this.registerForm.getRawValue().password ===
        this.registerForm.getRawValue().passwordConfirm
      )
    ) {
      // check both passwords
      this.loading = false;
      this.sb.open('Password did not match!', 'Okay!', {
        duration: 5000,
        panelClass: ['failed'],
      });
    } else {
      this.loading = false;
      this.isRegistered = true;
      this.auth.register(body).subscribe(
        (res: any) => {
          this.sb.open('Success', 'Okay', {
            duration: 5000,
            panelClass: ['success'],
          });
        },
        (error) => {
          this.loading = false;

          this.sb.open('Please input correct value', 'Okay', {
            duration: 3000,
            panelClass: ['failed'],
          });
        }
      );
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  // utils
  numberInputOnly(event: any) {
    return this.util.formNumberInputOnly(event);
  }
}
