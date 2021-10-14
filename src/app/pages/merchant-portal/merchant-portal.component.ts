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

@Component({
  selector: 'app-merchant-portal',
  templateUrl: './merchant-portal.component.html',
  styleUrls: ['./merchant-portal.component.scss'],
})
export class MerchantPortalComponent implements OnInit {
  isExpanded: boolean = true;
  merchantNav = MERCHANT_NAV;
  navs: any;
  loading: boolean = false;
  changeLabel = new EventEmitter<boolean>();
  routeLabel: string = '';
  page: any;
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
      (err) => {
        console.log(err);

        this.loading = false;
      }
    );
  }

  changeRoute(nav: any) {
    this.changeLabel.emit(nav);
    this.routeLabel = nav.label;
  }
}
