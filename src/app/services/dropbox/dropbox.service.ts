import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var require: any;

@Injectable({
  providedIn: 'root',
})
export class DropboxService {
  // ACCESS TOKEN DzRw_RqKzxEAAAAAAAAAAWb2306de5LGMnq_VFFW_Fm_fdw0ZnsTUKF3PQrpPBA6
  accessToken =
    'DzRw_RqKzxEAAAAAAAAAAWb2306de5LGMnq_VFFW_Fm_fdw0ZnsTUKF3PQrpPBA6';
  dbx: any;

  constructor() {
    let fetch = require('isomorphic-fetch');
    let Dropbox = require('dropbox').Dropbox;
    this.dbx = new Dropbox({
      fetch: fetch,
      accessToken: this.accessToken,
    });
  }

  checkAccount(): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .usersGetCurrentAccount()
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }
  checkPath(): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .filesListFolder({ path: '' })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          console.error(error);
        });
    });
  }

  getTempLink(path: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .filesGetTemporaryLink({
          path,
        })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          //console.log(error);
          observer.error(error);
        });
    });
  }

  getThumbnail(path: string): Observable<any> {
    let format = 'jpeg';
    return Observable.create((observer: any) => {
      this.dbx
        .filesGetThumbnailV2(
          {
            path,
          },
          format
        )
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((err: any) => {
          observer.error(err);
        });
    });
  }

  getPreview(path: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .filesGetPreview({ path })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((err: any) => {
          observer.error(err);
        });
    });
  }

  getMetaData(path: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .filesGetMetadata({ path })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((err: any) => {
          observer.error(err);
        });
    });
  }
  uploadFile(path: string, filename: string, file: any): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .filesUpload({
          path: path + filename,
          mode: 'overwrite',
          contents: file,
        })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          //console.log(error);
          observer.error(error);
        });
    });
  }
}
