import { Inject, Injectable } from '@angular/core';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { QueryParams, PatchBodyQuery } from '../../models/queryparams.iterface';
import { HttpService } from '../http/http.service';

// put Data collections here
type Collection = 'test_collections' | 'test_collections_2';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // env
  constructor(@Inject(HttpService) public http: HttpService) {}

  // fn

  insert(collection: Collection, body: object) {
    return this.http.start('post', 'post endpoint here' + collection, body);
  }
  update(collection: Collection, body: PatchBodyQuery) {
    return this.http.start('patch', 'patch endpoint here' + collection, body);
  }
  get(collection: Collection, QueryParams?: QueryParams) {
    return this.http.start('get', '/user/' + collection, {}, QueryParams);
  }

  insertMerchant(body: object) {
    return this.http.start('post', '/user/admin', body);
  }
  getMerchants(QueryParams?: QueryParams) {
    return this.http.start('get', '/user/admin', {}, QueryParams);
  }
  updateUser(body: any, type: string) {
    return this.http.start('patch', `/user/${type}/${body._id}`, body);
  }
}
