import { ActionResultComponent } from './../../shared/dialogs/action-result/action-result.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from './../../models/user.interface';
import { USER_NAV } from './../../config/NAVIGATIONS';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  NavigationStart,
  NavigationEnd,
  Event as NavigationEvent,
} from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  userNav = USER_NAV;
  me!: User;
  loading: boolean = false;
  page: any;
  mobileQuery!: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    private auth: AuthService,
    private router: Router,
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
    this.auth.me().subscribe(
      (res: any) => {
        console.log(res);
        this.me = res.env.user;
        let routerSplit = this.router.url.split('/').pop();
        let temp: Array<string> = [];

        this.userNav.forEach((i: any) => {
          temp.push(i);
        });

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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
