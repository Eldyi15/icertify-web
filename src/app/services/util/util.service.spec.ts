import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MOCK_USER_DATA } from 'src/app/config/KARMA_TESTING';

import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;
  let data: any = MOCK_USER_DATA

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UtilService);
  });
  describe('TEST DEEPFIND/TRAVERSEARRAY', () => {
    it('should return the expected value (Object)', () => {
      let returnedValue = service.deepFind(data, 'firstName')
      expect(returnedValue).toBe('Francis')
    })


    it('should return the expected value  (Array)', () => {
      data['addr1'] = ['addr1', 'addr2']
      let returnedValue = service.deepFind(data, 'addr1')
      expect(returnedValue).toBe('addr1, addr2')
    })
  })


});
