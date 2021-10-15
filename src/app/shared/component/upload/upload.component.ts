import { DropboxService } from './../../../services/dropbox/dropbox.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry
} from 'ngx-file-drop';
import FILETYPES from './../../component/upload/file.extensions.json';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploading: boolean = false
  accepted: string = "'.png,.jpeg,.jpg'"
  fileTypes: any = FILETYPES;
  uploadedFile: string = ''
  filename: string = ''

  constructor(public sb: MatSnackBar, public dbx: DropboxService, public dialogRef: MatDialogRef<UploadComponent>) { }

  ngOnInit(): void {
  }
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          var flag = false;
          this.accepted.split(',').forEach((a) => {
            console.log(this.fileTypes[a.trim()])
            if (file.type == this.fileTypes[a.trim()]) flag = true;
          });
          if (flag) {
            console.log(file)
            this.save(file);
          } else {
            console.log(file)
            this.sb.open('Incorrect Format!', 'Okay', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
              panelClass: ['failed'],
            });

          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        // console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    // console.log(event);
  }

  public fileLeave(event: any) {
    // console.log(event);
  }
  save(file: any) {
    console.log(file)
    this.uploading = true;
    let fileNameArray = file.name.split('.');
    console.log(fileNameArray)
    this.dbx
      .uploadFile(
        '/' + 'ICertify' + '/',
        fileNameArray[0] + '.' + fileNameArray[fileNameArray.length - 1],
        file
      )
      .subscribe(
        (resp: any) => {
          console.log(resp)
          setTimeout(() => {
            this.uploadedFile = resp;
            this.uploading = false;

          }, 1500);
          this.sb.open('File Successfully Uploaded!', undefined, {
            panelClass: ['success'],
            duration: 1500,
          });
          this.dialogRef.close(resp)
        },
        (err: any) => {
          // console.log(err);
          setTimeout(() => {
            this.uploading = false;
          }, 1500);
          this.sb.open('Failed to Upload File.', undefined, {
            panelClass: ['failed'],
            duration: 1500,
          });
        }
      );
  }
}

