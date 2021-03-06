import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/app/config/url';
// import { RegisterForm } from '../../models/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = URL;
  constructor(private http: HttpClient) { }

  setHeaders() {
    let csurf_token = localStorage.getItem('SESSION_CSURF_TOKEN')!;
    let session_token = localStorage.getItem('SESSION_AUTH')!;
    let rp_token = localStorage.getItem('RP_TOKEN');

    let headers = new HttpHeaders({
      c_auth: csurf_token || '',
      rp_auth: rp_token || '',
      authorization: `Bearer ${session_token}`,
    });
    console.log(headers)

    return { headers };
  }

  getHeaders() {
    return {
      withCredentials: true,
      ...this.setHeaders(),
    };
  }

  me() {
    return this.http.get(this.url + '/auth/me', this.getHeaders());
  }

  login(email: string, password: string) {
    return this.http.post(
      this.url + '/auth/login',
      { email, password },
      this.getHeaders()
    );
  }

  logout() {
    return this.http.get(this.url + '/auth/logout/', this.getHeaders());
  }
  register(body: any) {
    console.log(body);
    return this.http.post(this.url + '/user/user', body);
  }

  changePassword(body: any) {
    return this.http.post(
      this.url + '/user/updatePassword',
      body,
      this.getHeaders()
    );
  }
  changePasswordV2(body: any) {
    return this.http.post(
      this.url + '/user/updatePasswordV2',
      body,
      this.getHeaders()
    );
  }

  forgotPassword(mobileNumber: any) {
    return this.http.post(this.url + '/auth/forgot-Password', mobileNumber);
  }
  userForgotPassword(body: any) {
    return this.http.post(
      this.url + '/user/changePassword',
      body,
      this.getHeaders()
    );
  }
}
