import { MOCK_USER_DATA } from './../../config/KARMA_TESTING';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let userData = MOCK_USER_DATA


  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(AuthService);
    localStorage.setItem('SESSION_CSURF_TOKEN', "MOCK TOKEN")
    localStorage.setItem('SESSION_AUTH', "MOCK TOKEN")
    localStorage.setItem('RP_TOKEN', "MOCK TOKEN")
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // it('should return the same value from the initial setting of Headers', (async () => {
  //   let headers = new HttpHeaders({
  //     c_auth: "MOCK TOKEN",
  //     rp_auth: "MOCK TOKEN",
  //     authorization: `Bearer  MOCK TOKEN`,
  //   });
  //   expect(!service.setHeaders()).toEqual({ headers })

  // }))
});