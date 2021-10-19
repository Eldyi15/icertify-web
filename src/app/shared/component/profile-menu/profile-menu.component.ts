import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileItem } from 'src/app/models/profilemenu.interface';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  @Input() menuItems: any;
  @Input() me: any;
  @Input() avatarColors: any;
  @Output() onClick = new EventEmitter<any>();

  selfieLink: any;

  constructor(private dbx: DropboxService) {}

  ngOnInit(): void {
    this.initSelfie();
  }

  initSelfie() {
    let path;
    if (this.me.selfie) {
      path = this.me.selfie.path_display;
    }
    if (path) {
      this.dbx.getTempLink(path).subscribe((res: any) => {
        console.log(res.result.link);
        this.selfieLink = res.result.link;
      });
    }
  }
}
