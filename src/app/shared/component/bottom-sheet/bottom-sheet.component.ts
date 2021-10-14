import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, public bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) { }

  ngOnInit(): void {
    if (this.data.data.status === "Suspended") {
      this.data.bottomSheetConf.forEach((element: any) => {
        console.log(element)

        element.show = true
        if (element.label === "Suspend") {
          element.show = false
        }
      });
    }
    else if (this.data.data.status === "Active") {
      this.data.bottomSheetConf.forEach((element: any) => {
        console.log(element)
        element.show = true
        if (element.label === "Activate") {
          element.show = false
        }
      });
    }
    else {
      this.data.bottomSheetConf.forEach((element: any) => {
        console.log(element)
        element.show = true
      });
    }

    console.log(this.data)
  }
  onDismiss(action: string) {
    this.bottomSheetRef.dismiss(action)
  }
}
