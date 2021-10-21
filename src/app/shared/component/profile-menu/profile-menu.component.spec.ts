import { MOCK_USER_DATA } from './../../../config/KARMA_TESTING';
import { MaterialModule } from './../../material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMenuComponent } from './profile-menu.component';

describe('ProfileMenuComponent', () => {
  let component: ProfileMenuComponent;
  let fixture: ComponentFixture<ProfileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileMenuComponent],
      imports: [MaterialModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMenuComponent);
    component = fixture.componentInstance;
    component.me = MOCK_USER_DATA
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
