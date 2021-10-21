import { AuthService } from './../../../services/auth/auth.service';
import { MOCK_USER_DATA } from 'src/app/config/KARMA_TESTING';
import { MaterialModule } from './../../../shared/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { ApiService } from 'src/app/services/api/api.service';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let apiService: ApiService;
  let auth: AuthService


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [HttpClientTestingModule, MaterialModule],

    })
      .compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.inject(ApiService)
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    component.me = MOCK_USER_DATA
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user profile image', () => {
    spyOn(apiService, 'updateUser').and.callThrough()
    component.updateUserImg()
    expect(apiService.updateUser).toHaveBeenCalled()
  })

  it('should open dialog of user update details', () => {
    spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    component.updateDetails()
    expect(component.dialog.open).toHaveBeenCalled()
  })

  it('should open dialog to upload', () => {
    spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    component.changeProfile()
    expect(component.dialog.open).toHaveBeenCalled()
  })


});
