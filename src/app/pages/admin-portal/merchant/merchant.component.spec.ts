import { MaterialModule } from './../../../shared/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MerchantComponent } from './merchant.component';

describe('MerchantComponent', () => {
  let component: MerchantComponent;
  let fixture: ComponentFixture<MerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantComponent ],
      imports:[MaterialModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
