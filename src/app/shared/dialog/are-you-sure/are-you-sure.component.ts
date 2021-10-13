import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.scss'],
})
export class AreYouSureComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AreYouSureComponent>
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  proceed() {
    this.dialogRef.close(true);
  }
}
