import { MaterialModule } from './../../shared/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardComponent } from '../admin-portal/dashboard/dashboard.component';
import { AdminLoginComponent } from './admin-login.component';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';
import { Location } from '@angular/common';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLoginComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule, MaterialModule, RouterTestingModule.withRoutes([
        {
          path: 'admin-portal/admin-dashboard',
          component: DashboardComponent
        }

      ])]
    })
      .compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('won\'t login if one of the field is empty or both [email/password]', () => {

    let formCred = component.credential
    formCred.setValue({
      email: 'mreeves@gmail.com',
      password: '123qweasdzxc123'
    });
    expect(formCred.valid).toBeTrue();
  });

  it('should login type superadmin and redirect to admin-dashboard', fakeAsync(() => {
    component.credential.setValue({
      email: 'mreeves@gmail.com',
      password: '123qweasdzxc123'
    });
    let response = {
      env: {
        status: 'success',
        user: { type: 'Superadmin' }
      },
    }
    spyOn(authService, 'login').and.returnValue(
      of(response)
    );
    component.login();
    tick(200);
    fixture.detectChanges();
    const location = TestBed.inject(Location)
    expect(location.path()).toBe('/admin-portal/admin-dashboard')
  }));
});
