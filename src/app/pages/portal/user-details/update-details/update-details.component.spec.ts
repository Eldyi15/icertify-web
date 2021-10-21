import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from './../../../../shared/material.module';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MOCK_USER_DATA } from 'src/app/config/KARMA_TESTING';
import { UpdateDetailsComponent } from './update-details.component';
import { of } from 'rxjs';

fdescribe('UpdateDetailsComponent', () => {
  let component: UpdateDetailsComponent;
  let fixture: ComponentFixture<UpdateDetailsComponent>;
  let userData = MOCK_USER_DATA

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDetailsComponent],
      imports: [MaterialModule, HttpClientTestingModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { data: userData }
        },
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    console.log(userData.selfie)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog of user update details', fakeAsync(() => {
    spyOn(component.dialog, 'open')
      .and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    component.onUpdateUser()
    expect(component.dialog.open).toHaveBeenCalled()
  }))
  // it('should open dialog of user update details', fakeAsync(() => {
  //   component.onUpdateUser()
  //   expect(component.dialog.open).toHaveBeenCalled()
  // }))
});
