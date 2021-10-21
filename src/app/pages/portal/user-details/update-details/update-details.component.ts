import { ActionResultComponent } from './../../../../shared/dialogs/action-result/action-result.component';
import { ApiService } from 'src/app/services/api/api.service';
import { AreYouSureComponent } from './../../../../shared/dialogs/are-you-sure/are-you-sure.component';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { userFields } from '../user-form';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.scss'],
})
export class UpdateDetailsComponent implements OnInit {
  formFields = userFields;
  formData: any = {}
  toUpdateData: any;
  saving: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateDetailsComponent>,
    public dialog: MatDialog,
    private api: ApiService
  ) { }

  ngOnInit(): void {

  }

  formListener(event: any) {
    console.log(event);
    this.formData = event;
  }

  onUpdateUser() {
    console.log(this.data.data.selfie, "HEERERERER");
    this.formData.selfie = this.data.data.selfie;
    this.formData.valid_id = this.data.data.valid_id;
    this.formData._id = this.data.data._id;
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          msg: 'update your details',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.updateDetails();
        }
      });
  }

  updateDetails() {
    this.saving = true;
    this.api.updateUser(this.formData, 'User').subscribe(
      (res: any) => {
        console.log(res);
        this.saving = false;
        this.dialog
          .open(ActionResultComponent, {
            width: 'auto',
            height: 'auto',
            data: {
              msg: 'Details updated Successfully',
              success: true,
              button: 'Okay',
            },
          })
          .afterClosed()
          .subscribe((resp: any) => {
            console.log(resp);
            this.dialogRef.close(true);
          });
      },
      (err: any) => {
        console.log(err);
        this.saving = false;
        this.dialog.open(ActionResultComponent, {
          width: 'auto',
          height: 'auto',
          data: {
            msg: err.error.message || 'Server Error, Try Again',
            success: false,
            button: 'Got it',
          },
        });
      }
    );
  }
}
