import { MOCK_USER_DATA } from './../../../config/KARMA_TESTING';
import { ApiService } from './../../../services/api/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OtpService } from './../../../services/otp/otp.service';
import { MaterialModule } from './../../material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';


import { UpdateViewComponent } from './update-view.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';


describe('UpdateViewComponent', () => {
  let component: UpdateViewComponent;
  let fixture: ComponentFixture<UpdateViewComponent>;
  let apiService: ApiService;
  let userData = MOCK_USER_DATA

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateViewComponent],
      imports: [HttpClientTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, {
        provide: MAT_DIALOG_DATA, useValue: {
          data: {
            userData,
          }
        }
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.inject(ApiService)
    fixture = TestBed.createComponent(UpdateViewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be passing a data to form data', () => {
    let mockData = userData;
    component.data = mockData
    component.formListener(component.data)
    expect(component.formData === mockData).toBeTruthy()
  });

  it('should be passing a image to image data', () => {
    let mockData = { formValid: true, obj: 'image' };
    component.data = mockData
    component.imageEmitter(component.data)
    console.log(component.imageData)
    expect(component.imageData === mockData.obj).toBeTrue()
    expect(component.imageFormValid === mockData.formValid).toBeTrue()
  });

});

