import { Component, Inject, OnInit } from '@angular/core';
import { Column } from 'src/app/models/column.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-column-selector',
  templateUrl: './column-selector.component.html',
  styleUrls: ['./column-selector.component.scss'],
})
export class ColumnSelectorComponent implements OnInit {
  columns: Array<Column> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ColumnSelectorComponent>
  ) {}

  ngOnInit(): void {
    this.columns = JSON.parse(JSON.stringify(this.data.columns));
  }

  onClose() {
    this.dialogRef.close();
  }

  filterColumn(index: number) {
    this.columns[index].selected = !this.columns[index].selected;
  }

  onApply() {
    this.dialogRef.close(this.columns);
  }
}
