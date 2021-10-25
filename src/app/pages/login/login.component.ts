import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NavigationStart,
  NavigationEnd,
  Event as NavigationEvent,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  isLoggingIn: boolean = false;
  isLoggedIn: boolean = false;
  credential = this.fb.group({
    email: new FormControl('testuser@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123qweasdzxc123', [Validators.required]),
  });
  loadingInitial: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private sb: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        console.log(event);
      } else if (event instanceof NavigationEnd) {
        console.log(event);
      }
    });
  }

  ngOnInit(): void {
    this.loadingInitial = true;
    setTimeout(() => {
      this.loadingInitial = false;
    }, 1500);
  }

  formFieldErrMessage(fcName: string) {
    let formControl = this.credential.controls[fcName];
    if (formControl.hasError('required')) return 'You must enter a value';
    if (formControl.hasError('email')) return 'Invalid email';

    return '';
  }
  login() {
    this.isLoggingIn = true;
    this.auth
      .login(this.credential.value.email, this.credential.value.password)
      .subscribe(
        (res: any) => {
          this.isLoggingIn = false;
          this.isLoggedIn = true;
          console.log(res.env);

          localStorage.setItem('SESSION_CSURF_TOKEN', res.csrf_token);
          localStorage.setItem('SESSION_AUTH', res.token);
          if (res && res.env.user.type === 'User') {
            this.router.navigate(['/portal/user-dashboard']);
          } else if (res && res.env.user.type === 'Merchant') {
            this.router.navigate(['/merchant-portal/merchant-dashboard']);
          } else {
            this.isLoggedIn = false;
            console.log('Unauthorized access');
            this.sb.open('Unauthorized', undefined, { duration: 1000 });
          }
        },
        (err) => {
          this.isLoggingIn = false;
          this.isLoggedIn = false;
          console.log(err);
          this.sb.open('Unauthorized', undefined, { duration: 1000 });
        }
      );
  }

  register() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    this.dialog
      .open(ForgotPasswordComponent, {
        panelClass: 'dialog-responsive-light',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
