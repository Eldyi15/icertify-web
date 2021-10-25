import { ActionResultComponent } from './../../shared/dialogs/action-result/action-result.component';
import { OtpService } from 'src/app/services/otp/otp.service';
import { OtpComponent } from './../../shared/component/otp/otp.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
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
  toMatch = false;
  registerForm = this.fb.group(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      // middleName: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl(''),
      mobileNumber: new FormControl('', [
        Validators.required,
        this.checkMobileNum(),
      ]),
    },
    {
      validator: this.matchPassword('password', 'passwordConfirm'),
    }
  );
  loadingInitial: boolean = false;

  mobileNumber = this.registerForm.getRawValue().mobileNumber;
  constructor(
    private sb: MatSnackBar,
    private fb: FormBuilder,
    private auth: AuthService,
    private util: UtilService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadingInitial = true;
    setTimeout(() => {
      this.loadingInitial = false;
    }, 1500);
  }
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

  formFieldErrMessage(fcName: string) {
    let formControl = this.registerForm.controls[fcName];

    if (formControl.hasError('required')) return 'You must enter a value';
    if (formControl.hasError('email')) return 'Invalid email';
    if (formControl.hasError('passwordMismatch'))
      return 'Password confirm mismatch!';
    if (formControl.hasError('invalidNumber')) return 'Invalid Number';

    return;
  }

  matchPassword(password: string, passwordConfirm: string) {
    return (fb: FormGroup) => {
      const passwordControl = fb.controls[password];
      const confirmPasswordControl = fb.controls[passwordConfirm];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        this.toMatch = true;
        confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }

  checkMobileNum() {
    return (control: AbstractControl) => {
      const mNumber = control.value;
      if (!mNumber.startsWith('9') || mNumber.length !== 10) {
        return { invalidNumber: true };
      }

      return null;
    };
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
      mobileNumber: this.registerForm.getRawValue().mobileNumber,
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
          if (res) {
            //SUCCESS HERE
            this.dialog
              .open(ActionResultComponent, {
                height: 'auto',
                width: 'auto',
                data: {
                  msg: 'Account Registered Successfully',
                  success: true,
                  button: 'Got it!',
                },
              })
              .afterClosed()
              .subscribe((res: any) => {
                if (res) {
                  this.router.navigate(['/login']);
                }
              });
          }
        },
        (error) => {
          this.loading = false;
          console.log(error);
          this.dialog.open(ActionResultComponent, {
            height: 'auto',
            width: 'auto',
            data: {
              msg: error.error.message || 'Server error, Try again!',
              button: 'Got it!',
              success: false,
            },
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
