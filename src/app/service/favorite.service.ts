import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Consts} from '../common/consts';
import {Love} from '../model/love';
import {Observable} from 'rxjs/index';
import {JsonBean} from '../model/jsonbean';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends CommonService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  list(love: Love): Observable<JsonBean> {
    return this.httpClient.post(Consts.URL + 'favorite/list', love, Consts.JSON).pipe();
  }

  delete(love: Love): Observable<JsonBean> {
    return this.post(Consts.URL + 'favorite/delete', {'id': love.id});
  }
}
