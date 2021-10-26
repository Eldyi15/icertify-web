import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Column } from 'src/app/models/column.interface';

@Component({
  selector: 'app-column-selector',
  templateUrl: './column-selector.component.html',
  styleUrls: ['./column-selector.component.scss'],
})
export class ColumnSelectorComponent implements OnInit {
  columns: Array<Column> = [];
  @Output() columnEvent: EventEmitter<any> = new EventEmitter
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ColumnSelectorComponent>
  ) {
    this.dialogRef.backdropClick().subscribe((res: any) => {
      this.dialogRef.close(this.columns);
    });
  }

  ngOnInit(): void {
    this.columns = JSON.parse(JSON.stringify(this.data.columns));
    this.dialogRef.backdropClick().subscribe(() => {
      this.onApply();
    });
  }

  filterColumn(index: number) {
    this.columns[index].selected = !this.columns[index].selected;
  }

  onApply() {
    this.dialogRef.close(this.columns);
  }
}