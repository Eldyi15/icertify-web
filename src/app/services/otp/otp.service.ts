import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from 'src/app/config/url';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  url = URL;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const otpToken = localStorage.getItem('insert token for OTP here');
    const headers = new HttpHeaders({
      o_auth: otpToken || '',
    });

    return headers;
  }

  send(mobileNumber: string, email?: string, customText?: string) {
    return this.http.post(
      this.url + 'auth/otp/send',
      {
        mobileNumber,
        email,
        customText,
      },
      this.getOptions()
    );
  }

  validate(otp: string, token?: string) {
    return this.http.post(
      this.url + 'auth/otp/validate',
      { otp },
      this.getOptions()
    );
  }

  getOptions() {
    return {
      withCredentials: true,
      ...this.getHeaders,
    };
  }
}
