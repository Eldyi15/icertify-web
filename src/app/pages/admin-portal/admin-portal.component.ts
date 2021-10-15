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

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss'],
})
export class AdminPortalComponent implements OnInit {
  isExpanded: boolean = true;
  adminNav = ADMIN_NAVS;
  me!: User;
  navs: any;
  loading: boolean = false;
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
        }, 500);
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
      (err) => {
        console.log(err);
      }
    );
  }
  logout() {
    this.auth.logout().subscribe((res) => {
      console.log(res);
      localStorage.removeItem('SESSION_CSURF_TOKEN');
      localStorage.removeItem('SESSION_AUTH');
      this.router.navigate(['/login']);
    });
  }

  changeRoute(nav: any) {
    this.changeLabel.emit(nav);
    this.routeLabel = nav.label;
  }
}
