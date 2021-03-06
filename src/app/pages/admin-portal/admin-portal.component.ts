import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from './../../services/api/api.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ChangePasswordComponent } from 'src/app/shared/component/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import {
  NavigationStart,
  NavigationEnd,
  Event as NavigationEvent,
} from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { ADMIN_NAVS } from 'src/app/config/NAVIGATIONS';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { SA_MENU, SA_MENU_COLORS } from './enum';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss'],
})
export class AdminPortalComponent implements OnInit {
  isExpanded: boolean = true;
  adminNav = ADMIN_NAVS;
  saMenuColors = SA_MENU_COLORS;
  superAdminMenu = SA_MENU;
  me!: User;
  navs: any;
  loading: boolean = false;
  loggingOut: boolean = false;
  changeLabel = new EventEmitter<boolean>();
  routeLabel: string = '';
  page: any;
  initialLoading: boolean = true;

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
        }, 2000);
      }
    });
  }

  ngOnInit(): void {
    this.auth.me().subscribe(
      (res: any) => {
        // console.log(res);
        this.me = res.env.user;
        console.log('current user(me): ', this.me);
        let routerSplit = this.router.url.split('/').pop();
        console.log(routerSplit);
        let temp: Array<string> = [];

        this.adminNav.forEach((i: any) => {
          temp.push(i);
        });

        this.page = this.adminNav.find((o: any) => o.route === routerSplit);
        if (this.page) this.routeLabel = this.page.label;
      },
      (error: any) => {
        this.dialog.open(ActionResultComponent, {
          width: 'auto',
          height: 'auto',
          disableClose: true,
          data: {
            msg: error.error.message,
            success: false,
            button: 'Got it',
          },
        }).afterClosed().subscribe(() => {
          this.router.navigate(['/admin-login'])
        });
      }
    );
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
          this.loading = true;
          this.auth.logout().subscribe((res) => {
            localStorage.removeItem('SESSION_CSURF_TOKEN');
            localStorage.removeItem('SESSION_AUTH');
            this.loggingOut = false;
            this.router.navigate(['/admin-login']);
          });
        }
      });
  }

  changeRoute(nav: any) {
    this.changeLabel.emit(nav);
    this.routeLabel = nav.label;
  }

  menuClick(event: any) {
    switch (event) {
      case 'logout':
        this.logout();
        break;
      default:
    }
  }
}
