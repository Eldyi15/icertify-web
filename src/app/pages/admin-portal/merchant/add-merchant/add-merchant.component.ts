import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { addMerchantForm } from './MERCHANT-FORM';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.scss'],
})
export class AddMerchantComponent implements OnInit {
  addMerchant = addMerchantForm;
  merchantForm = this.fb.group({});
  saving: boolean = false;
  isAdded: boolean = false

  constructor(
    public dialogRef: MatDialogRef<AddMerchantComponent>,
    private fb: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm() {
    let tempForm: any = {};
    this.addMerchant.forEach((form: any) => {
      let validators = form.validator || [];
      if (form.required) validators.push(Validators.required);

      tempForm[form.fcname] = new FormControl('', validators);
    });

    this.merchantForm = this.fb.group(tempForm);
  }

  onSave() {
    this.saving = true;
    this.api.insertMerchant(this.merchantForm.value).subscribe((res: any) => {
      console.log(res);
      this.isAdded = true
    }, (err: any) => {
      console.log(err)

      this.isAdded = false
    });
  }
}
