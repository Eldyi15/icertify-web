import { FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  otp: string = '';
  show = false;
  verifying = false;
  isTimerOff = true;
  timeLeft = 300;
  interval: any;
  showInterface = false;
  otpFields = [
    {
      type: 'number',
      maxlength: '1',
      required: true,
      fcname: 'otp1',
    },
    {
      type: 'number',
      maxlength: '1',
      required: true,
      fcname: 'otp2',
    },
    {
      type: 'number',
      maxlength: '1',
      required: true,
      fcname: 'otp3',
    },
    {
      type: 'number',
      maxlength: '1',
      required: true,
      fcname: 'otp4',
    },
  ];

  otpVal = this.fb.group({});
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OtpComponent>
  ) {}

  ngOnInit(): void {}

  otpController(event: any, next: any, prev: any) {
    // console.log(next, prev);
    if (event.target.value.length < 1 && prev) {
      prev.focus();
    } else if (next && event.target.value.length > 0) {
      next.focus();
    } else {
      return 0;
    }
  }
}
