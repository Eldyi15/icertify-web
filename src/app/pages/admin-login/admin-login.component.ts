import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  hide: boolean = true;
  isLoggingIn: boolean = false;

  credential = this.fb.group({
    email: new FormControl('testsuper1@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123qweasdzxc123', [Validators.required]),
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {}

  formFieldErrMessage(fcName: string) {
    let formControl = this.credential.controls[fcName];
    if (formControl.hasError('required')) return 'You must enter a value';
    if (formControl.hasError('email')) return 'Invalid email';

    return '';
  }
  login() {
    this.isLoggingIn = true;
    // let rawCredentials = this.credential.getRawValue();
    this.auth
      .login(this.credential.value.email, this.credential.value.password)
      .subscribe(
        (res: any) => {
          this.isLoggingIn = false;
          console.log(res);
          localStorage.setItem('SESSION_CSURF_TOKEN', res.csrf_token);
          localStorage.setItem('SESSION_AUTH', res.token);
          if (res.env.user.type !== 'Superadmin') {
            console.log('You are not an authorized user');

            this.sb.open(`${res.env.user.type} is not Authorized`, undefined, {
              duration: 1000,
            });
          } else this.router.navigate(['/admin-portal/admin-dashboard']);
        },
        (err) => {
          this.isLoggingIn = false;
          console.log(err);

          this.sb.open('Unauthorized', undefined, { duration: 1000 });
        }
      );
  }
}
