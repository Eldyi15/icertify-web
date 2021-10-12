import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from './../../shared/material.module';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPortalComponent } from './admin-portal.component';

describe('AdminPortalComponent', () => {
  let component: AdminPortalComponent;
  let fixture: ComponentFixture<AdminPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPortalComponent ],
      imports:[HttpClientTestingModule,ReactiveFormsModule,FormsModule,MaterialModule,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
