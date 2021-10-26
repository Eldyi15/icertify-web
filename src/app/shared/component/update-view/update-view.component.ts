import { ApiService } from 'src/app/services/api/api.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { FormFields } from './enum';
import { Component, OnInit, Inject } from '@angular/core';
import { AreYouSureComponent } from '../../dialogs/are-you-sure/are-you-sure.component';
import { ActionResultComponent } from '../../dialogs/action-result/action-result.component';

@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrls: ['./update-view.component.scss'],
})
export class UpdateViewComponent implements OnInit {
  isSaving = false;
  formFields = FormFields;
  action = this.data.action;
  toUpdateData: any;
  imageData: any = {};
  formData: any;
  loading: boolean = false;
  imageFormValid: boolean = false;
  formProperties = {
    dirty: undefined,
    touched: undefined,
    valid: undefined
  }

  constructor(
    public api: ApiService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  };

  formListener(event: any) {
    let raw = event.raw
    // raw.mobileNumber = `${raw.mobileNumber}`;
    console.log(event);
    this.formData = raw;
    this.formProperties = event.properties
  };

  imageEmitter(event: any) {
    this.imageData = event.obj;
    this.imageFormValid = event.formValid;
  }

  onCancel() {
    // TODO: 
    // Add return properties of image form (dirty,touched,valid)
    if (this.formProperties.dirty || this.formProperties.touched)
      this.dialog
        .open(AreYouSureComponent, {
          data: {
            msg: 'close this dialog without saving changes',
          },
        })
        .afterClosed()
        .subscribe((res: any) => {
          if (res) this.dialogRef.close();
        });
    else
      this.dialogRef.close()
  }

  onSave() {
    let formData = this.formData ? this.formData : this.data.data;
    this.toUpdateData = { ...this.imageData, ...formData };
    this.dialog
      .open(AreYouSureComponent, {
        disableClose: true,
        data: {
          header: 'Update Details',
          msg: this.data && this.data.action ? this.data.action : 'update',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {

        let type = '';
        if (this.data.data.type === 'User') {
          type = 'user';
        } else {
          type = 'admin';
        }

        if (this.data.action === 'Activate') {
          this.toUpdateData.status = 'Active';
        }
        if (res) {
          this.loading = true;
          this.toUpdateData['_id'] = this.data.data._id;
          console.log(type);
          console.log(this.toUpdateData, 'Before');
          this.api.updateUser(this.toUpdateData, type).subscribe(
            (res: any) => {
              console.log(res);
              if (res) {
                this.loading = false;
                this.dialogRef.close(true);
                this.dialog
                  .open(ActionResultComponent, {
                    width: 'auto',
                    height: 'auto',
                    disableClose: true,
                    data: {
                      msg: 'Details updated successfully!',
                      success: true,
                      button: 'Got it',
                    },
                  })
                  .afterClosed()
                  .subscribe((res: any) => {
                    if (res) this.dialogRef.close(true);
                  });
              }
            },
            (error: any) => {
              console.log(error);
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
      });
  }
}
