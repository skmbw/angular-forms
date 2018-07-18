import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';

@Injectable({
  providedIn: 'root'
})
export class LoveService {

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorage) {
  }

  save(targetId: string, type: string) {
    const body = {
      'targetId': targetId,
      'type': type,
      'userId': this.tokenStorage.getUserId()
    };
    this.httpClient.post(Consts.URL + 'love/doAdd', body).pipe();
  }
}
