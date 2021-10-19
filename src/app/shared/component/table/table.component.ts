import { ActionResultComponent } from './../../dialogs/action-result/action-result.component';
import { ApiService } from 'src/app/services/api/api.service';
import { UpdateViewComponent } from './../update-view/update-view.component';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  HostListener,
  Input,
} from '@angular/core';
import { UtilService } from 'src/app/services/util/util.service';
import { Column } from 'src/app/models/column.interface';
import { MatDialog } from '@angular/material/dialog';
import { ColumnSelectorComponent } from './column-selector/column-selector.component';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { AreYouSureComponent } from '../../dialogs/are-you-sure/are-you-sure.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: Array<string> = [];
  keyword: string = '';
  @Input() title?: string;
  @Input() filterButtons?: any;
  @Input() dataSource: any;
  @Input() loading: boolean = false;
  @Input() str: any;
  @Input() columns!: Array<Column>;
  duplicateColumns!: Array<Column>;
  @Output() pageChange = new EventEmitter<any>();
  @Input() dataLength: any;
  @Input() pagination: any;
  @Input() show: boolean = true;
  @Input() pageTitle: string = '';
  @Input() bottomSheetConf?: Array<any>;
  sort: any;
  curPageIndex: number = 1;

  constructor(
    private api: ApiService,
    public util: UtilService,
    private dialog: MatDialog,

    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    // console.log(this.pagination);

    this.duplicateColumns = JSON.parse(JSON.stringify(this.columns));
    this.displayedColumns = [];

    this.updateBreakpoint();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateBreakpoint();
  }

  updateBreakpoint() {
    this.displayedColumns = [];
    let w = window.innerWidth;
    var bps: Array<string> = [];

    bps.push('xs');

    if (w > 576) {
      bps.push('sm');
    }

    if (w > 768) {
      bps.push('md');
    }

    if (w > 992) {
      bps.push('lg');
    }

    if (w > 1200) {
      bps.push('xl');
    }

    this.columns = this.duplicateColumns.filter((o) =>
      bps.includes(o.breakpoint)
    );
    this.columns.forEach((d) => {
      if (d.selected) this.displayedColumns.push(d.path);
    });
    console.log(this.displayedColumns);
  }

  triggerSearch() {
    this.dataSource = [];
    var fields: Array<string> = [];
    this.duplicateColumns.forEach((c) => {
      if (c.path) fields.push(c.path);
    });
    var toEmit: TableOutput = {
      pageIndex: 0,
      pageSize: 10,
    };
    if (this.keyword)
      toEmit['filter'] = {
        value: this.keyword,
        fields,
      };

    console.log(toEmit);
    this.pageChange.emit(toEmit);
  }

  onClickPagination(event: any) {
    console.log(event);
    event['pageIndex'] = event.pageIndex + 1;
    this.curPageIndex = event.pageIndex;
    this.dataSource = [];
    var fields: Array<string> = [];
    this.duplicateColumns.forEach((c) => {
      if (c.path) fields.push(c.path);
    });
    if (this.keyword)
      event['filter'] = {
        value: this.keyword,
        fields,
      };
    this.pageChange.emit(event);
  }

  sortData(event: any) {
    console.log(event);
    this.dataSource = [];
    this.sort = event;
    var toEmit: TableOutput = {
      pageIndex: 0,
      pageSize: 10,
      sort: event,
    };
    var fields: Array<string> = [];
    this.duplicateColumns.forEach((c) => {
      if (c.path) fields.push(c.path);
    });
    if (this.keyword)
      toEmit['filter'] = {
        value: this.keyword,
        fields,
      };
    this.pageChange.emit(toEmit);
  }

  triggerRefresh() {
    this.dataSource = [];
    var toEmit: TableOutput = {
      pageIndex: 0,
      pageSize: 10,
      sort: this.sort,
    };
    if (!toEmit.sort) delete toEmit.sort;
    var fields: Array<string> = [];
    this.duplicateColumns.forEach((c) => {
      if (c.path) fields.push(c.path);
    });
    if (this.keyword)
      toEmit['filter'] = {
        value: this.keyword,
        fields,
      };
    this.pageChange.emit(toEmit);
  }

  openColumnSelector() {
    this.dialog
      .open(ColumnSelectorComponent, {
        width: '30rem',
        height: 'auto',
        data: {
          columns: [...this.columns],
        },
      })
      .afterClosed()
      .subscribe((res: Array<Column>) => {
        if (res) {
          this.duplicateColumns = res;
          this.updateBreakpoint();
        }
      });
  }
  onRowClick(data: any, index: number) {
    console.log(data, index, this.bottomSheetConf);
    this._bottomSheet
      .open(BottomSheetComponent, {
        data: {
          data,
          index,
          bottomSheetConf: this.bottomSheetConf,
        },
      })
      .afterDismissed()
      .subscribe((res: any) => {
        let action = res;
        console.log(res);
        if (res) {
          console.log(data);
          switch (res) {
            case 'View':
            case 'Update':
              this.dialog
                .open(UpdateViewComponent, {
                  width: '70%',
                  data: { data, action: res },
                })
                .afterClosed()
                .subscribe((res: any) => {
                  if (res) {
                    var toEmit: TableOutput = {
                      pageIndex: 0,
                      pageSize: 10,
                      // sort: 'desc',
                    };
                    this.pageChange.emit(toEmit);
                  }
                });
              break;

            default:
              this.dialog
                .open(AreYouSureComponent, {
                  width: 'auto',
                  data: { header: res, msg: res },
                })
                .afterClosed()
                .subscribe((res) => {
                  let updatedData = JSON.parse(JSON.stringify(data));
                  let newStatus;
                  if (res) {
                    if (action === 'Delete') {
                      newStatus = 'Deleted';
                    }
                    if (action === 'Suspend') {
                      newStatus = 'Suspended';
                    }
                    if (action === 'Activate') {
                      newStatus = 'Active';
                    }
                    console.log('beforesub', data);
                    updatedData.status = newStatus;
                    this.api
                      .updateUser(updatedData, 'admin')
                      .subscribe((response: any) => {
                        console.log(response);
                        this.dialog
                          .open(ActionResultComponent, {
                            width: 'auto',
                            height: 'auto',
                            disableClose: true,
                            data: {
                              msg: [action + ' Merchant successful!'],
                              success: true,
                              button: 'Got it',
                            },
                          })
                          .afterClosed()
                          .subscribe(() => {
                            var toEmit: TableOutput = {
                              pageIndex: 0,
                              pageSize: 10,
                              // sort: 'desc',
                            };
                            this.pageChange.emit(toEmit);
                          });
                        console.log(res);
                      });
                  }
                });

              break;
          }
        }
      });
  }
}
