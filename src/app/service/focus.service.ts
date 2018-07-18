import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';

@Injectable({
  providedIn: 'root'
})
export class FocusService {

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorage) {
  }

  save(targetId: string, type: string) {
    this.httpClient.post(Consts.URL + 'focus/doAdd',
      {'targetId': targetId, 'type': type, 'userId': this.tokenStorage.getUserId()}).pipe();
  }
}
