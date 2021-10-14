import { DropboxService } from './../../../services/dropbox/dropbox.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadComponent } from '../upload/upload.component';
import { ImageFields } from './enum';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit {
  imageFields = ImageFields;
  @Output() imageEmitter = new EventEmitter<any>();
  @Input() obj: any
  @Input() action: string = ''
  images: any = []
  constructor(public dialog: MatDialog, public dbx: DropboxService) { }

  ngOnInit(): void {

    this.getImage()
  }
  getImage() {
    this.imageFields.forEach((img) => {
      console.log(this.obj)
      img.fields.forEach(async (f: any) => {
        this.images.unshift({ fcName: f.fcName, label: f.label, imgLink: this.obj[f.fcName] ? await this.getTempLink(this.obj[f.fcName]['path_display']) : 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg' })

      })

    })
  }

  onClick(fcname: string) {
    this.dialog.open(UploadComponent, { width: "50%", height: 'auto' }).afterClosed().subscribe((res: any) => {
      if (res) {
        this.images.forEach(async (img: any) => {
          if (fcname === img.fcName) {
            img.imgLink = await this.getTempLink(res.result.path_display)
            console.log(img.imgLink)
          }
        })
        this.obj[fcname] = res.result
        this.imageEmitter.emit(this.obj)
      }
    })
  }
  async getTempLink(data: any) {
    console.log(data)
    const response = await this.dbx.getTempLink(data).toPromise()
    console.log(response)
    return response.result.link
  }
}
