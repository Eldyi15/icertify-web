import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActionResultComponent } from './action-result.component';

describe('ActionResultComponent', () => {
  let component: ActionResultComponent;
  let fixture: ComponentFixture<ActionResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionResultComponent],
      imports: [],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
