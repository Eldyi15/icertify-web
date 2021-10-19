import { NgxFileDropEntry } from 'ngx-file-drop';
import { NGXFILEDROP_TEST_DATA } from './../../../config/KARMA_TESTING';
import { MaterialModule } from './../../material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import { MatDialogRef } from '@angular/material/dialog';

xdescribe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let fileDefault = NGXFILEDROP_TEST_DATA

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadComponent],
      imports: [MaterialModule],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get the dropped image from Filedrop functionality', () => {

  });
});
