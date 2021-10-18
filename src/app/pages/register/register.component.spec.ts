import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule, MaterialModule, ReactiveFormsModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be password mismatch', () => {
    component.registerForm.setValue({
      firstName: 'Michael',
      lastName: 'Reeves',
      email: 'mreeves@gmail.com',
      password: '123qweasdzxc123',
      passwordConfirm: '123qweasdzxc153',
      mobileNumber: '9123456789'
    });

    component.register();

    expect(
      component.registerForm.getRawValue().password ===
      component.registerForm.getRawValue().passwordConfirm
    ).toBeFalse;
  });

  it('should be password match', () => {
    component.registerForm.setValue({
      firstName: 'Michael',
      lastName: 'Reeves',
      email: 'mreeves@gmail.com',
      password: '123qweasdzxc123',
      passwordConfirm: '123qweasdzxc123',
      mobileNumber: '9123456789'
    });

    component.register();

    expect(component.registerForm.getRawValue().password).toBe(
      component.registerForm.getRawValue().passwordConfirm
    );
  });

  it('email field validity', () => {
    const email = component.registerForm.controls.email;
    email.setValue('mreeves@gmail.com');
    expect(email.hasError('email')).toBeFalse();
  });


  it('won\'t enable register button if one of the field is empty or more', fakeAsync(() => {
    component.registerForm.setValue({
      firstName: 'Michael',
      lastName: 'Reeves',
      email: 'mreeves@gmail.com',
      password: '123qweasdzxc123',
      passwordConfirm: '123qweasdzxc123',
      mobileNumber: '9123876345'
    });
    spyOn(authService, 'register').and.returnValue(
      of({
        res: {
          env: {
            status: 'success',
          },
        },
      })
    );
    component.register();
    tick(200);
    fixture.detectChanges();
    expect(component.registerForm.valid).toBeTrue()
    expect(component.isRegistered).toBeTrue();
  }));
});
