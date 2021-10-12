import { AuthService } from 'src/app/services/auth/auth.service';
import { AddMerchantComponent } from './add-merchant/add-merchant.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MERCHANT_COLUMNS } from './enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueryParams } from 'src/app/models/queryparams.iterface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { UtilService } from 'src/app/services/util/util.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Column } from 'src/app/models/column.interface';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss'],
})
export class MerchantComponent implements OnInit {
  title: string = 'Merchant';
  columns = MERCHANT_COLUMNS;
  dataSource: Array<any> = [];
  dataLength = 0;
  page = {
    pageSize: 10,
    currentPage: 1,
  };
  loading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private util: UtilService,
    private sb: MatSnackBar,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.me().subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.fetchData({ pageSize: this.page.pageSize, pageIndex: 1 });
  }

  openAdd() {
    this.dialog
      .open(AddMerchantComponent, {
        height: 'auto',
        width: '35vw',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  fetchData(event: TableOutput) {
    this.loading = true;
    this.dataSource = [];
    this.page.currentPage = event.pageIndex;

    let query: QueryParams = {
      find: [],
      page: event.pageIndex,
      limit: event.pageSize + '',
    };

    this.util.fetchData(event, query).subscribe(
      (res: any) => {
        console.log(res);
        this.loading = false;
        this.dataSource = res.env.admin;
        this.page.pageSize = event.pageSize;
        this.dataLength = res.total;
      },
      (err: any) => {
        console.log(err.message);
        this.loading = false;
      }
    );
  }
}
