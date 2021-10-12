import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterForm } from 'src/app/models/register.interface';
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
  constructor(
    private sb: MatSnackBar,
    private fb: FormBuilder,
    private auth: AuthService,
    private util: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.loading = true;
    // set body
    let body: RegisterForm = {
      firstName: this.registerForm.getRawValue().firstName,
      lastName: this.registerForm.getRawValue().lastName,
      email: this.registerForm.getRawValue().email,
      password: this.registerForm.getRawValue().password,
      passwordConfirm: this.registerForm.getRawValue().passwordConfirm,
      mobileNumber: this.registerForm.getRawValue().mobileNumber,
    };

    // check both passwords
    if (
      !(
        this.registerForm.getRawValue().password ===
        this.registerForm.getRawValue().passwordConfirm
      )
    ) {
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
