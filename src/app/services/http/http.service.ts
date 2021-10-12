import { Injectable } from '@angular/core';

import { QueryParams } from '../../models/queryparams.iterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from './../../config/url';

type Methods = 'get' | 'post' | 'put' | 'delete' | 'patch';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // envs
  constructor(private http: HttpClient) {}

  // fn
  private getHeaders(): any {
    let csurf_token = localStorage.getItem('SESSION_CSURF_TOKEN')!;
    let session_token = localStorage.getItem('SESSION_AUTH')!;

    let headers = new HttpHeaders({
      c_auth: csurf_token || '',
      authorization: `Bearer ${session_token}`,
    });

    return { headers };
  }

  start(
    method: Methods,
    endpoint: string,
    body: object,
    query?: QueryParams
  ): any {
    let queryArray: Array<string> = [];

    // Set up queries if a query exists
    if (query) {
      if (query.filter) {
        queryArray.push(
          `searchVal=${
            query.filter.value
          }&searchFields=${query.filter.fields.join()}`
        );
      }
      if (query.find) {
        query.find.forEach((f) => {
          let str = f.field + f.operator + f.value;
          queryArray.push(str);
        });
      }
      if (query.fields) queryArray.push(`fields=${query.fields}`);
      if (query.limit) queryArray.push(`limit=${query.limit}`);
      if (query.page) queryArray.push(`page=${query.page}`);
      if (query.sort) queryArray.push(`sort=${query.sort}`);
      if (query.populates) {
        let temp: Array<string> = [];
        query.populates.forEach((f) => {
          let str = `populate=${f.field}`;
          if (f.select) {
            str += `&popField=${f.select}`;
          }
          temp.push(str);
        });
        queryArray.push(temp.join('&'));
      }
    }
    // console.log('Query Array: ' + queryArray);

    let option = {
      withCredentials: true,
      ...this.getHeaders(),
    };
    // console.log(option)

    endpoint = URL + endpoint;
    let queryStr = queryArray.join('&') ? '?' + queryArray.join('&') : '';
    // console.log('Final endpoint: ' + endpoint + queryStr);

    switch (method) {
      case 'get': // Get Request: getting data
        return this.http.get(endpoint + queryStr, option);
      case 'post': // Post Request: inserting data
        return this.http.post(endpoint, body, option);
      case 'put': // Put Request: updating all data
        return this.http.put(endpoint, option);
      case 'patch': // Patch Request: updating some of the data
        return this.http.patch(endpoint, body, option);
      case 'delete': // Delete Request: deleting data
        return this.http.delete(endpoint, option);
      default:
        return this.http.get(endpoint, option);
    }
  }
}
