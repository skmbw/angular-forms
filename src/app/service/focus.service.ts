import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Consts} from '../common/consts';

@Injectable({
  providedIn: 'root'
})
export class FocusService {

  constructor(private httpClient: HttpClient) {
  }

  save() {
    this.httpClient.post(Consts.URL + 'focus/doAdd', null).pipe();
  }
}
