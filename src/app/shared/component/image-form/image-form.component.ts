import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth/auth.service';
import { DropboxService } from './../../../services/dropbox/dropbox.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadComponent } from '../upload/upload.component';
import { ImageFields } from './enum';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss'],
})
export class ImageFormComponent implements OnInit {
  imageFields = ImageFields;
  @Output() imageEmitter = new EventEmitter<any>();
  @Input() obj: any;
  @Input() action: string = '';
  images: any = [];
  me: any = {};
  imageForm = this.fb.group({});
  gettingImages: boolean = true;
  constructor(
    public dialog: MatDialog,
    public dbx: DropboxService,
    public auth: AuthService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    const res: any = await this.auth.me().toPromise();
    this.me = res.env.user;
    console.log(this.me);
    await this.getImage();
  }
  getImage() {
    this.gettingImages = true;
    let temp: any = {};
    this.imageFields.forEach((img) => {
      img.fields.forEach(async (f: any) => {
        if (this.me.type === 'Superadmin' && f.fcName === 'valid_id') {
          f.isVisible = false;
        }

        if (this.me.type === 'User' && f.fcName === 'ibp_id') {
          f.isVisible = false;
        }
        if (f.isVisible) {
          temp[f.fcName] = new FormControl(
            this.obj && this.obj[f.fcName] ? this.obj[f.fcName] : '',
            [Validators.required]
          );
        }
        this.images.push({
          isVisible: f.isVisible,
          fcName: f.fcName,
          label: f.label,
          imgLink:
            this.obj && this.obj[f.fcName]
              ? await this.getTempLink(this.obj[f.fcName]['path_display'])
              : '',
        });
        console.log(this.images);
      });
      console.log(temp);
      this.imageForm = this.fb.group(temp);
    });
    this.gettingImages = false;
    this.imageEmitter.emit({
      obj: this.imageForm.getRawValue(),
      formValid: this.imageForm.valid,
      formDirty: this.imageForm.dirty
    });
  }

  onClick(fcname: string) {
    this.dialog
      .open(UploadComponent, { panelClass: 'dialog-darken' })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.images.forEach(async (img: any) => {
            if (fcname === img.fcName) {
              img.imgLink = await this.getTempLink(res.result.path_display);
              console.log(img.imgLink);
            }
          });
          this.obj[fcname] = res.result;

          this.imageForm.get(fcname)?.setValue(res.result);
          console.log(this.imageForm.get(fcname));
          this.imageForm.markAsDirty();
          this.imageEmitter.emit({
            obj: this.imageForm.getRawValue(),
            formValid: this.imageForm.valid,
            formDirty: this.imageForm.dirty
          });
        }
      });
  }
  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    console.log(response);
    return response.result.link;
  }
}
