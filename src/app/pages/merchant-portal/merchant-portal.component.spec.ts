import { MaterialModule } from './../../shared/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPortalComponent } from './merchant-portal.component';

describe('MerchantPortalComponent', () => {
  let component: MerchantPortalComponent;
  let fixture: ComponentFixture<MerchantPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPortalComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule,MaterialModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
