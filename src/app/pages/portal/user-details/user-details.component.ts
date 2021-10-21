import { UpdateDetailsComponent } from './update-details/update-details.component';
import { ActionResultComponent } from './../../../shared/dialogs/action-result/action-result.component';
import { ApiService } from 'src/app/services/api/api.service';
import { UploadComponent } from './../../../shared/component/upload/upload.component';
import { MatDialog } from '@angular/material/dialog';
import { userFields } from './user-form';
import { DropboxService } from './../../../services/dropbox/dropbox.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  formFields = userFields;
  profileImg: any;
  imgLoaded: boolean = false;
  me: any;
  loading: boolean = false;
  constructor(
    private auth: AuthService,
    private dbx: DropboxService,
    private dialog: MatDialog,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchInitial();
  }
  fetchInitial() {
    this.loading = true;
    this.auth.me().subscribe(
      (res: any) => {
        console.log(res);
        this.loading = false;
        this.me = res.env.user;
        console.log(this.me);
        this.getImage(this.me.selfie.path_display);
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  getImage(imgPath: any) {
    this.dbx.getTempLink(imgPath).subscribe((res: any) => {
      console.log(res);
      this.profileImg = res.result.link;
      this.imgLoaded = true;
    });
  }

  changeProfile() {
    this.dialog
      .open(UploadComponent, { panelClass: 'dialog-darken' })
      .afterClosed()
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.me.selfie = res.result;
            console.log(this.me);
            this.updateUserImg();
          }
        },
        (err: any) => {
          this.dialog.open(ActionResultComponent, {
            height: 'auto',
            width: 'auto',
            data: {
              msg: err.error.message || 'Server Error, Try Again',
              button: 'Got it',
              success: false,
            },
          });
        }
      );
  }

  updateUserImg() {
    this.api.updateUser(this.me, 'User').subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.dialog
          .open(ActionResultComponent, {
            data: {
              msg: 'Profile image successfully changed!',
              success: true,
              button: 'Okay',
            },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) this.fetchInitial();
          });
      }
    });
  }

  updateDetails() {
    this.dialog
      .open(UpdateDetailsComponent, {
        width: 'auto',
        height: 'auto',
        disableClose: true,
        data: {
          data: this.me,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
        if (res) this.fetchInitial();
      });
  }
}
