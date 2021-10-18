import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OtpService } from './otp.service';

describe('OtpService', () => {
  let service: OtpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
