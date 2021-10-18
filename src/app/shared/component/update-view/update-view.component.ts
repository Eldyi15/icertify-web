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
  formFields = FormFields;
  action = this.data.action;
  toUpdateData: any;
  imageData: any = {}
  formData: any
  loading: boolean = false;
  imageFormValid: boolean = false;
  constructor(
    public api: ApiService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }
  formListener(event: any) {
    event.mobileNumber = `${event.mobileNumber}`;
    // console.log(event);
    this.formData = event;
  }
  imageEmitter(event: any) {
    this.imageData = event.obj;
    this.imageFormValid = event.formValid
  }
  onCancel() {
    this.dialogRef.close();
  }
  onSave() {
    let formData = this.formData ? this.formData : this.data.data
    this.toUpdateData = { ...this.imageData, ...formData }
    this.dialog
      .open(AreYouSureComponent, {
        data: { header: 'Update Details', msg: this.data && this.data.action ? this.data.action : 'update' },
      })
      .afterClosed()
      .subscribe((res: any) => {
        let type = ''
        if (this.data.data.type === 'User') {
          type = 'user'
        }
        else {
          type = 'admin'
        }
        this.loading = true
        if (this.data.action === "Activate") {
          this.toUpdateData.status = "Active"
        }
        if (res) {
          this.toUpdateData['_id'] = this.data.data._id;
          console.log(type)
          console.log(this.toUpdateData, "Before")
          this.api.updateUser(this.toUpdateData, type).subscribe((res: any) => {
            console.log(res);
            if (res) {
              this.loading = false
              this.dialog
                .open(ActionResultComponent, {
                  width: 'auto',
                  height: 'auto',
                  disableClose: true,
                  data: {
                    msg: 'Update details successful!',
                    success: true,
                    button: 'Got it',
                  },
                }).afterClosed().subscribe((res: any) => {
                  if (res)
                    this.dialogRef.close(true);
                })
            }
          }, (error: any) => {
            console.log(error)
            this.dialog.open(ActionResultComponent, {

              width: 'auto',
              height: 'auto',
              disableClose: true,
              data: {
                msg: error.error.message,
                success: false,
                button: 'Got it',
              },
            }

            )


          });
        }
      })
  }
}

