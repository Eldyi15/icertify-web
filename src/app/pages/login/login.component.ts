import { ApiService } from './../../services/api/api.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';

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
    email: new FormControl('testuser@gmail.com', [Validators.required]),
    password: new FormControl('123qweasdzxc123', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    private sb: MatSnackBar,
    private router: Router,
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {}

  login() {
    this.isLoggingIn = true;
    // let rawCredentials = this.credential.getRawValue();
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
}
