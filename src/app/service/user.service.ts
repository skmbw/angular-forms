import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {JsonBean} from '../model/jsonbean';
import {User} from '../model/user';
import {Consts} from '../common/consts';
import {JsUtils} from '../common/js-utils';

/**
 * 用户服务
 */
@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  register(user: User): Observable<JsonBean> {
    return this.httpClient.post(Consts.URL + 'user/register', user, Consts.JSON);
  }

  login(user: User): Observable<JsonBean> {
    // const body = JsUtils.toQueryString(user);
    return this.httpClient.post(Consts.URL + 'user/login', user, Consts.JSON);
  }
}
