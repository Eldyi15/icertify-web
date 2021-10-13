import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../../shared/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../services/auth/auth.service';
import { ApiService } from '../../../../services/api/api.service';
import { AddMerchantComponent } from './add-merchant.component';
import { of } from 'rxjs';

describe('AddMerchantComponent', () => {
  let component: AddMerchantComponent;
  let fixture: ComponentFixture<AddMerchantComponent>;
  let authService: AuthService;
  let apiService: ApiService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [AddMerchantComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.inject(ApiService)
    fixture = TestBed.createComponent(AddMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('won\'t enable add merchant button if one of the field is empty or all', fakeAsync(() => {
    component.merchantForm.setValue({
      firstName: 'Michael',
      middleName: 'Verge',
      lastName: 'Reeves',
      email: 'mreeves@gmail.com',
      mobileNumber: '09123456789',
    });

    spyOn(apiService, 'insertMerchant').and.returnValue(
      of({
        res: {
          env: {
            status: 'success',
          },
        },
      })
    );
    component.onSave();
    tick(200);
    fixture.detectChanges();
    expect(component.merchantForm.valid).toBeTrue();
  }));
  it('should call login subscription', fakeAsync(() => {
    component.merchantForm.setValue({
      firstName: 'Michael',
      middleName: 'Verge',
      lastName: 'Reeves',
      email: 'mreeves@gmail.com',
      mobileNumber: '09123456789',
    });

    spyOn(apiService, 'insertMerchant').and.returnValue(
      of({
        res: {
          env: {
            status: 'success',
          },
        },
      })
    );
    component.onSave();
    tick(200);
    fixture.detectChanges();
    expect(component.isAdded).toBeTrue();
  }));


});
