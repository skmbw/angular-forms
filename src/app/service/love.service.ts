import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Consts} from '../common/consts';

@Injectable({
  providedIn: 'root'
})
export class LoveService {

  constructor(private httpClient: HttpClient) {
  }

  save() {
    this.httpClient.post(Consts.URL + 'love/doAdd', null).pipe();
  }
}
