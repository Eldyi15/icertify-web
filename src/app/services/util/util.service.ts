import { Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.iterface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  // env
  empties = [null, undefined];

  constructor(private api: ApiService) {}

  // fn
  traverseArray(arr: any[], path: string, values: any[] = []): any {
    if (!arr.length) return values.join(', ');

    const arrCopy = [...arr];
    const obj = arrCopy.splice(0, 1)[0];

    const foundVal = this.deepFind(obj, path);
    if (foundVal) values.push(foundVal);
    return this.traverseArray(arr.slice(1), path, values);
  }

  deepFind(obj: any, path: string | Array<string | number>): any {
    if (!obj) return '';
    if (obj && !path) return '';

    if (typeof path == 'string') return this.deepFind(obj, path.split('.'));
    else if (path.length == 0) return this.empties.includes(obj) ? '' : obj;
    else if (Array.isArray(obj)) {
      return this.traverseArray(obj, path.join('.'));
    } else return this.deepFind(obj[path[0]], path.slice(1));
  }

  formNumberInputOnly(event: any) {
    return (
      // backspace
      (event.charCode > 7 && event.charCode < 9) ||
      // period ('.')
      (event.charCode > 45 && event.charCode < 47) ||
      // 0-9
      (event.charCode > 47 && event.charCode < 58) ||
      // delete
      (event.charCode > 126 && event.charCode < 128)
    );
  }

  fetchData(event: TableOutput, query: QueryParams, collection?: any) {
    console.log(event, query);
    let newQuery: QueryParams = {
      limit: event.pageSize + '',
      page: event.pageIndex,
      find: query.find ? query.find : [],
      populates: query.populates ? query.populates : [],
    };
    if (event.filter) newQuery.filter = event.filter;
    if (event.sort)
      newQuery.sort =
        (event.sort.direction == 'asc' ? '' : '-') + event.sort.active;

    // change to universal GET
    console.log(newQuery);
    if (collection) {
      return this.api.get(collection, newQuery);
    } else {
      return this.api.getMerchants(newQuery);
    }
  }
}
