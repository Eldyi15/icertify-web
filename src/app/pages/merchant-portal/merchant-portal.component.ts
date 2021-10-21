import { ChangePasswordComponent } from './../../shared/component/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  NavigationStart,
  NavigationEnd,
  Event as NavigationEvent,
  Router,
} from '@angular/router';
import { MERCHANT_NAV } from 'src/app/config/NAVIGATIONS';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { MERCHANT_MENU, MERCHANT_MENU_COLORS } from './enum';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';

@Component({
  selector: 'app-merchant-portal',
  templateUrl: './merchant-portal.component.html',
  styleUrls: ['./merchant-portal.component.scss'],
})
export class MerchantPortalComponent implements OnInit {
  isExpanded: boolean = true;
  merchantNav = MERCHANT_NAV;
  merchantMenu = MERCHANT_MENU;
  menuColors = MERCHANT_MENU_COLORS;
  me: any;
  navs: any;
  loading: boolean = false;
  changeLabel = new EventEmitter<boolean>();
  routeLabel: string = '';
  page: any;
  loggingOut: boolean = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
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
  }

  ngOnInit(): void {
    this.loading = true;
    this.auth.me().subscribe(
      (res: any) => {
        this.me = res.env.user;
        console.log(res);
        this.loading = false;
        if (res && res.env.user.status === 'Pending') {
          this.dialog.open(ChangePasswordComponent, {
            panelClass: 'dialog-change',
            disableClose: true,
          });
        } else {
          this.loading = false;
          let routerSplit = this.router.url.split('/').pop();
          console.log(routerSplit);
          let temp: Array<string> = [];

          this.merchantNav.forEach((i: any) => {
            temp.push(i);
          });

          this.page = this.merchantNav.find(
            (o: any) => o.route === routerSplit
          );
          if (this.page) this.routeLabel = this.page.label;
        }
      },
      (error: any) => {
        this.loading = false;
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

  changeRoute(nav: any) {
    this.changeLabel.emit(nav);
    this.routeLabel = nav.label;
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
        if (res) {
          this.loggingOut = true;
          this.auth.logout().subscribe((res) => {
            console.log(res);
            this.loggingOut = false;
            localStorage.removeItem('SESSION_CSURF_TOKEN');
            localStorage.removeItem('SESSION_AUTH');
            this.router.navigate(['/login']);
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

  menuClick(event: any) {
    switch (event) {
      case 'logout':
        this.logout();
        break;
      case 'changepassword':
        this.changePassword();
        break;
      default:
    }
  }
}
