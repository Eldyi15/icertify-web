import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';

@Component({
  selector: 'app-merchant-profile',
  templateUrl: './merchant-profile.component.html',
  styleUrls: ['./merchant-profile.component.scss'],
})
export class MerchantProfileComponent implements OnInit {
  profileImg: any;
  imgLoaded: boolean = false;
  me: any;
  loading: boolean = false;
  constructor(
    public auth: AuthService,
    private dbx: DropboxService,
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
}
