import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.me().subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
