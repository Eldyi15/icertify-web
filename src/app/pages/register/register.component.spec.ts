import { LoginComponent } from './../login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule, MaterialModule, ReactiveFormsModule, RouterTestingModule.withRoutes([
        {
          path: 'login',
          component: LoginComponent
        }
      ])],
      providers: [{ provide: MatDialogRef, useValue: { close: () => { } } }]
    }).compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });



  it('should be password match', () => {
    component.registerForm.setValue({
      firstName: 'Michael',
      lastName: 'Reeves',
      email: 'mreeves@gmail.com',
      password: '123qweasdzxc123',
      passwordConfirm: '123qweasdzxc153',
      mobileNumber: '9123456789'
    });
    component.register();
    expect(component.isRegistered).toBeFalse()
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
  it('should show password', () => {
    component.toggleShowPassword()
    expect(component.showPassword).toBeTrue()
  })

  it('should navigate to login page', fakeAsync(() => {
    let location = TestBed.inject(Location)
    component.login()
    tick(200);
    fixture.detectChanges();
    expect(location.path()).toBe('/login')

  }))
  it('should send otp and call register function', fakeAsync(() => {
    spyOn(component, 'register')
    spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    component.register()

    tick(200);
    fixture.detectChanges();
    expect(component.dialog).toBeDefined()
    expect(component.register).toHaveBeenCalled()
  }))
});
