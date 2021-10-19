import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { UtilService } from 'src/app/services/util/util.service';
import { Section, Field } from 'src/app/models/appforms.interface';
type ColumnSizes = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() formFields!: Array<Section>;
  @Output() formInitiated = new EventEmitter<null>();
  @Output() formListener = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  @Output() onClick = new EventEmitter<any>();
  @Input() action?: string;
  @Input() object?: any;

  // replacers =
  form = this.fb.group({});
  formArrayFields: any = {};
  arrayCss: any = {};
  gridCss: Array<ColumnSizes> = ['sm', 'md', 'lg', 'xl'];
  css: any = {};

  constructor(public util: UtilService, public fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.formFields);
    this.initForm();
  }

  // form initializer
  initForm() {
    // console.log(this.object)
    let temp: any = {};
    let result: any = {};

    this.formFields = JSON.parse(JSON.stringify(this.formFields));

    // Setting up fields
    this.formFields.forEach((section: Section) => {
      section.fields.forEach((field: Field) => {
        result = this.setFields(field);
        temp[field.fcName] = result.field;
        // set css column
        this.css[field.fcName] = result.css;
      });
    });

    console.log(temp);

    // setting up form
    this.form = this.fb.group(temp);

    // Getting new Values
    this.form.valueChanges.subscribe((raw) => {
      this.formFields.forEach((sections: Section) => {
        sections.fields.forEach((newField: Field) => {
          if (newField.type === 'number' && raw[newField.fcName]) {
            raw[newField.fcName] = parseFloat(
              (raw[newField.fcName] + '').split(',').join('')
            );
          }
          // put replacers here!
        });
      });

      // Setting new values to the Current values
      let pure = { ...raw };
      this.formFields.forEach((sections: Section) => {
        sections.fields.forEach((curField: Field) => {
          if (
            curField.type == 'number' &&
            raw[curField.fcName] &&
            !curField.isPercentage
          ) {
            this.form
              .get(curField.fcName)
              ?.setValue(
                (raw[curField.fcName] + '').replace(
                  /\d(?=(?:\d{3})+$)/g,
                  '$&,'
                ),
                { emitEvent: false }
              );
          }
        });
      });
      pure['valid'] = this.form.valid;
      this.formListener.emit(pure);
      setTimeout(() => {
        // if(this.obj) this.evaluate();
      }, 0);
    });

    setTimeout(() => {
      console.log(this.form.valid);
      this.formInitiated.emit();
    }, 200);
  }
  // form init utils
  setFields(field: Field) {
    let temp: any = {
      css: [],
    };
    let defaultValue: any;
    let fieldTypes: any = [
      'percentage',
      'number',
      'text',
      'select',
      'select_with_checkbox',
      'textarea',
    ];
    if (field.type === 'checkbox') {
      defaultValue = field.defaultValue ? field.defaultValue : false;
    } else {
      defaultValue = field.defaultValue || undefined;
    }

    if (field.type === 'form_array') {
      temp.field = this.fb.array([]);
      if (field.arrayFields) {
        this.setArrayFields(field.fcName, field.arrayFields);
      }
    }

    if (fieldTypes.includes(field.type)) {
      temp.field = new FormControl(
        {
          value: this.object ? this.object[field.fcName] : defaultValue,
          disabled: field.isDisabled
            ? field.isDisabled
            : this.action === 'Update'
              ? false
              : true,
        },
        {
          updateOn: 'blur',
          validators: this.setFieldValidators(field),
        }
      );
    } else {
      temp.field = new FormControl({
        value: defaultValue,
        disabled: field.isDisabled ? field.isDisabled : false,
      });
    }
    this.gridCss.forEach((colSize: ColumnSizes) => {
      if (!temp.css[field.fcName]) {
        temp.css[field.fcName] = ['col-12'];
      }
      temp.css[field.fcName].push(colSize + ':col-' + field.colspan[colSize]);
    });
    temp.css = temp.css[field.fcName].join(' ');
    console.log(temp);
    return temp;
  }
  setArrayFields(fieldName: any, fields: Array<Field>) {
    let result: any = {};

    fields.forEach((field: Field) => {
      result = this.setFields(field);
      this.formArrayFields[fieldName][field.fcName] = result.field;
      this.arrayCss[fieldName][field.fcName] = result.css;
    });
  }

  getArrayField(name: any): any {
    return this.form.get(name) as FormArray;
  }

  addFieldFormArray(field: any, arrayName: any): void {
    const fields = this.fb.group(field.arrayFields);
    this.getArrayField(arrayName).push(fields);
  }

  deleteFieldFormArray(index: any, arrayName: any): void {
    this.getArrayField(arrayName).removeAt(index);
  }
  setFieldValidators(field: Field): any {
    let validators: Array<any> = [];
    if (!['checkbox'].includes(field.type) && !field.isOptional) {
      validators.push(Validators.required);
    }
    // Try set custom validators

    return validators;
  }

  editing = false;
  editingVar: any;

  edit(event: any) {
    this.editing = true;
    this.editingVar = event;
    this.onClick.emit(event);
    this.form.controls[event].enable();
  }

  cancel(event: any) {
    this.editing = false;
    this.onCancel.emit(event);
    this.form.controls[event].disable();
  }

  numberInputOnly(event: any) {
    return this.util.formNumberInputOnly(event);
  }
}
