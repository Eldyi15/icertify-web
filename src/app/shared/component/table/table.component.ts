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
  @Output() onRowClick = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  @Input() dataLength: any;
  @Input() pagination: any;
  @Input() show: boolean = true;
  sort: any;
  curPageIndex: number = 1;

  constructor(public util: UtilService, private dialog: MatDialog) {}

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
        width: '40rem',
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
}
