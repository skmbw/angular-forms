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
export class FavoriteService {

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorage) {
  }

  list(love: Love): Observable<JsonBean> {
    return this.httpClient.post(Consts.URL + 'favorite/list', love, Consts.JSON).pipe();
  }
}
