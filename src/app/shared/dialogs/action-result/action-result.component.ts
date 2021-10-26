import { Router } from '@angular/router';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/models/column.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { AreYouSureComponent } from '../are-you-sure/are-you-sure.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-action-result',
  templateUrl: './action-result.component.html',
  styleUrls: ['./action-result.component.scss'],
})
export class ActionResultComponent implements OnInit {
  @Input() dataSource: any;
  duplicateColumns!: Array<Column>;
  sort: any;
  keyword: string = '';
  loggingOut: boolean = false;
  @Output() pageChange = new EventEmitter<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService,
    public dialogRef: MatDialogRef<ActionResultComponent>,
    public router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }
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
          this.loggingOut = true
          this.auth.logout().subscribe((res) => {
            console.log(res);
            this.loggingOut = false;
            localStorage.removeItem('SESSION_CSURF_TOKEN');
            localStorage.removeItem('SESSION_AUTH');
            this.router.navigate(['/login']);
            this.dialogRef.close()
          });
        }
      });
  }
}
