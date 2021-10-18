import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Column } from 'src/app/models/column.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';

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
  @Output() pageChange = new EventEmitter<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ActionResultComponent>
  ) { }

  ngOnInit(): void { }

}
