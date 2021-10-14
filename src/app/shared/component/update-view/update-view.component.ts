import { ApiService } from 'src/app/services/api/api.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { FormFields } from './enum';
import { Component, OnInit, Inject } from '@angular/core';
import { AreYouSureComponent } from '../../dialogs/are-you-sure/are-you-sure.component';

@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrls: ['./update-view.component.scss'],
})
export class UpdateViewComponent implements OnInit {
  formFields = FormFields;
  action = this.data.action;
  toUpdateData: any;
  constructor(
    public api: ApiService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  formListener(event: any) {
    event.mobileNumber = `${event.mobileNumber}`;
    console.log(event);
    this.toUpdateData = event;
  }
  imageEmitter(event: any) {
    console.log(event);
    this.toUpdateData = event;
  }
  onCancel() {
    this.dialogRef.close();
  }
  onSave() {
    console.log(this.toUpdateData);
    this.dialog
      .open(AreYouSureComponent, {
        data: { header: 'Update Details', msg: 'update' },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.toUpdateData['_id'] = this.data.data._id;
          this.api.updateUser(this.toUpdateData).subscribe((res: any) => {
            console.log(res);
            if (res) this.dialogRef.close();
          });
        }
      });
  }
}
