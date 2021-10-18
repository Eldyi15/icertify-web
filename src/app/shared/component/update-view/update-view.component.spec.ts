import { OtpService } from './../../../services/otp/otp.service';
import { MaterialModule } from './../../material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateViewComponent } from './update-view.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


fdescribe('UpdateViewComponent', () => {
  let component: UpdateViewComponent;
  let fixture: ComponentFixture<UpdateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateViewComponent],
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be passing a data to form data', () => {
    let mockData = { mockdata: "Sample" };
    component.data = mockData
    component.formListener(component.data)
    expect(component.formData === mockData).toBeTruthy()
  });

  // it('should be passing a data to image data', () => {
  //   let mockData = { image: "Sample.png" };
  //   component.data = mockData
  //   component.imageEmitter(component.data)
  //   console.log(component.imageData)
  //   expect(component.imageData === mockData).toBeTrue()
  // })
});