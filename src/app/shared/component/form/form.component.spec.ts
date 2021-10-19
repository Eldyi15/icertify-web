import { MOCK_FORM_FIELDS } from './../../../config/KARMA_TESTING';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from './../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        ReactiveFormsModule, MaterialModule, HttpClientTestingModule, FormsModule, BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    component.formFields = MOCK_FORM_FIELDS
    fixture.detectChanges();
  });

  it('should initialized form fields from other components', () => {
    component.initForm()
    expect(component.formFields).toBeDefined();
    expect(component.form).toBeDefined()
  });
});
