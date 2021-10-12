import { AuthService } from './../../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../shared/material.module';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'

import { LoginComponent } from './login.component';
import { of } from 'rxjs/internal/observable/of';
import * as UserDashboard  from '../portal/dashboard/dashboard.component';
import * as MerchantDashboard from '../merchant-portal/dashboard/dashboard.component'
import { Location } from '@angular/common';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService:AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[MaterialModule,BrowserAnimationsModule,HttpClientTestingModule,ReactiveFormsModule,RouterTestingModule.withRoutes([
        {
          path:'portal/user-dashboard',
          component:UserDashboard.DashboardComponent
        },
          {
          path:'merchant-portal/merchant-dashboard',
          component:MerchantDashboard.DashboardComponent
        }
      ])],
      providers:[AuthService]
    })
      .compileComponents();
  });

  beforeEach(()=>{
    authService = TestBed.inject(AuthService)
       fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('won\'t enable to login if one of the field is empty or both [email/password]',()=>{
  
    let formCred = component.credential
    formCred.setValue({
      email: '',
      password: ''
    })
    expect(formCred.valid).toBeFalse()
  })

  it('should login type user and redirect to user-dashboard',fakeAsync(()=>{
     const location = TestBed.inject(Location)
   component.credential.setValue({
      email:"testuser@gmail.com",
      password:"123qweasdzxc123"
    })
let response ={
            env: {
              status: 'success',
              user:{type:'User'},

            },
          }
   
    spyOn(authService, 'login').and.returnValue(of(response))

    component.login()
      tick(200);
      fixture.detectChanges();
 
    //  expect(component.isLoggedIn).toBeTrue()
     expect(location.path()).toBe('/portal/user-dashboard')

  }))

it('should login type merchant and redirect to merchant-dashboard',fakeAsync(()=>{
     const location = TestBed.inject(Location)
   component.credential.setValue({
      email:"testuser@gmail.com",
      password:"123qweasdzxc123"
    })
let response ={
            env: {
              status: 'success',
              user:{type:'Merchant'},

            },
          }
   
    spyOn(authService, 'login').and.returnValue(of(response))

    component.login()
      tick(200);
      fixture.detectChanges();
 
    //  expect(component.isLoggedIn).toBeTrue()
     expect(location.path()).toBe('/merchant-portal/merchant-dashboard')

  }))
  it('won\'t login if wrong credentials is given',fakeAsync(()=>{
     const location = TestBed.inject(Location)
   component.credential.setValue({
      email:"testuser@gmail.com",
      password:"wrong_password"
    })
let response ={
            env: {
              status: 'fail',
              user:{type:'Error'},

            },
          }
   
    spyOn(authService, 'login').and.returnValue(of(response))

    component.login()
      tick(200);
      fixture.detectChanges();
 
    //  expect(component.isLoggedIn).toBeTrue()
     expect(component.isLoggedIn).toBeFalse()

  }))

});
