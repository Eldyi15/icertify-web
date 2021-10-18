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
    const otpToken = localStorage.getItem('OTP_TOKEN');
    const headers = new HttpHeaders({
      o_auth: otpToken || '',
    });
    console.log(otpToken);

    return { headers };
  }

  send(mobileNumber: string, email?: string, customText?: string) {
    return this.http.post(
      this.url + '/auth/otp/send',
      {
        mobileNumber,
        email,
        customText,
      },
      this.getHeaders()
    );
  }

  validate(otp: any) {
    return this.http.post(
      this.url + '/auth/otp/validate',
      { otp },
      this.getHeaders()
    );
  }

  getOptions() {
    let otp = localStorage.getItem('OTP_TOKEN');
    console.log(otp);
    return {
      withCredentials: true,
      ...this.getHeaders,
    };
  }
}
