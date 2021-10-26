import { ActionResultComponent } from './../../../../shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from '../../../../shared/dialogs/are-you-sure/are-you-sure.component';
import {
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { addMerchantForm } from './MERCHANT-FORM';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from 'src/app/services/api/api.service';
import { identifierModuleUrl } from '@angular/compiler';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.scss'],
})
export class AddMerchantComponent implements OnInit {
  addMerchant = addMerchantForm;
  merchantForm = this.fb.group({});
  saving: boolean = false;
  isAdded: boolean = false;
  toAddData: any = {};


  imageFormValid: boolean = false;

  step = 1;

  constructor(
    public dialogRef: MatDialogRef<AddMerchantComponent>,
    private fb: FormBuilder,
    private api: ApiService,
    private dialog: MatDialog,
    private util: UtilService,
  ) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  formFieldErrMessage(fcName: string, label: string) {
    let formControl = this.merchantForm.controls[fcName];

    if (formControl.hasError('required')) return `${label} is required!`;
    if (formControl.hasError('email')) return 'Invalid email!';
    if (formControl.hasError('passwordMismatch'))
      return 'Password confirm mismatch!';
    if (formControl.hasError('invalidNumber')) return 'Invalid Number!';

    return;
  }
  checkMobileNum() {
    return (control: AbstractControl) => {
      const mNumber = control.value;
      if (!mNumber.startsWith('9') || mNumber.length !== 10) {
        return { invalidNumber: true };
      }

      return null;
    };
  }

  imageEmitter(event: any) {
    console.log(event);
    this.toAddData = { ...this.merchantForm.getRawValue(), ...event.obj };
    this.imageFormValid = event.formValid;
  }
  initiateForm() {
    let tempForm: any = {};
    this.addMerchant.forEach((form: any) => {
      let validators = form.validator || [];
      if (form.required) validators.push(Validators.required);
      if (form.mobileNumOnly) validators.push(this.checkMobileNum());

      tempForm[form.fcname] = new FormControl('', validators);
    });

    this.merchantForm = this.fb.group(tempForm);
  }

  onSave() {
    // this.toAddData = this.merchantForm.getRawValue()

    console.log(this.toAddData);
    this.saving = true;
    this.api.insertMerchant(this.toAddData).subscribe(
      (res: any) => {
        console.log(res);
        this.isAdded = true;
        this.dialogRef.close(true);
      },
      (error: any) => {
        this.isAdded = false;
        this.saving = false;
        this.dialog.open(ActionResultComponent, {
          width: 'auto',
          height: 'auto',
          disableClose: true,
          data: {
            msg: error.error.message,
            success: false,
            button: 'Got it',
          },
        });
      }
    );
  }

  submit() {
    this.dialog
      .open(AreYouSureComponent, {
        height: 'auto',
        width: 'auto',
        disableClose: true,
        data: {
          msg: 'you want to create this merchant',
        },
      })
      .afterClosed()
      .subscribe(
        (res: any) => {
          if (res) {
            this.onSave();
          }
        },
        (error: any) => {
          this.dialog.open(ActionResultComponent, {
            width: 'auto',
            height: 'auto',
            disableClose: true,
            data: {
              msg: error.error.message,
              success: false,
              button: 'Got it',
            },
          });
        }
      );
  }
  close() {
    if (!this.merchantForm.pristine) {
      this.dialog
        .open(AreYouSureComponent, {
          data: {
            msg: 'cancel adding merchant',
          },
        })
        .afterClosed()
        .subscribe((res: any) => {
          if (res) {
            this.dialogRef.close();
          }
        });
    } else {
      this.dialogRef.close();
    }
  }

  numberInputOnly(event: any, mobileNumOnly: boolean) {
    if (mobileNumOnly)
      return this.util.formNumberInputOnly(event);
  }
}
