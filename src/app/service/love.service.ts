import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Consts} from '../common/consts';
import {TokenStorage} from '../token/token.storage';
import {Love} from '../model/love';
import {Observable} from 'rxjs/index';
import {JsonBean} from '../model/jsonbean';

@Injectable({
  providedIn: 'root'
})
export class LoveService {

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorage) {
  }

  save(love: Love): Observable<JsonBean> {
    love.userId = this.tokenStorage.getUserId();
    return this.httpClient.post<JsonBean>(Consts.URL + 'love/add', love, Consts.JSON).pipe();
  }
}
