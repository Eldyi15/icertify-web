import { UpdateViewComponent } from './../../shared/component/update-view/update-view.component';
import { ActionResultComponent } from './../../shared/dialogs/action-result/action-result.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from './../../models/user.interface';
import { USER_NAV } from './../../config/NAVIGATIONS';
import { PORTAL_MENU } from './enum';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChangePasswordComponent } from 'src/app/shared/component/change-password/change-password.component';
import {
  NavigationStart,
  NavigationEnd,
  Event as NavigationEvent,
} from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ProfileItem } from 'src/app/models/profilemenu.interface';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  userNav = USER_NAV;
  portalMenu: Array<ProfileItem> = PORTAL_MENU;
  me!: User;
  loading: boolean = false;
  page: any;
  mobileQuery!: MediaQueryList;
  loggingOut: boolean = false;
  private _mobileQueryListener: () => void;
  constructor(
    private auth: AuthService,
    public router: Router,
    private dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.loading = true;
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    });

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    console.log(this.router.url);
    this.auth.me().subscribe(
      (res: any) => {
        console.log(res);
        this.me = res.env.user;
        let routerSplit = this.router.url.split('/').pop();
        let temp: Array<string> = [];
        this.userNav.forEach((i: any) => {
          temp.push(i);
        });
        if (res.env.user.type === 'User') {
          if (res.env.user.status === 'Pending') {
            this.dialog
              .open(ActionResultComponent, {
                disableClose: true,
                width: 'auto',
                height: 'auto',
                data: {
                  msg: 'Account is still pending!, continue to activate account?',
                  button: 'Activate',
                  pending: 'true',
                },
              })
              .afterClosed()
              .subscribe((res: any) => {
                this.dialog.open(UpdateViewComponent, {
                  width: '70%',
                  disableClose: true,
                  data: { data: this.me, action: 'Activate' },
                });
              });
          }
        }

        this.page = this.userNav.find((o: any) => o.route === routerSplit);
      },
      (err) => {
        console.log(err);
        this.dialog
          .open(ActionResultComponent, {
            width: 'auto',
            height: 'auto',
            data: {
              msg: err.message || 'Server error, Kindly refresh the page!',
              button: 'Okay',
              success: false,
            },
          })
          .afterClosed()
          .subscribe((res: any) => {
            this.ngOnInit();
          });
      }
    );
  }

  profile() {
    this.router.navigate(['portal/user-details']);
  }

  logout() {
    this.dialog
      .open(AreYouSureComponent, {
        height: 'auto',
        width: 'auto',
        disableClose: true,
        data: {
          msg: 'you want to logout?',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        this.loggingOut = true;
        if (res) {
          this.auth.logout().subscribe((res) => {
            console.log(res);
            this.loggingOut = false;
            localStorage.removeItem('SESSION_CSURF_TOKEN');
            localStorage.removeItem('SESSION_AUTH');
            this.router.navigate(['/admin-login']);
          });
        }
      });
  }
  changePassword() {
    this.dialog.open(ChangePasswordComponent, {
      panelClass: 'dialog-change',
      disableClose: true,
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  menuClick(event: any) {
    switch (event) {
      case 'logout':
        this.logout();
        break;
      case 'changepassword':
        this.changePassword();
        break;
      case 'profile':
        this.profile();
        break;
      default:
    }
  }
}
