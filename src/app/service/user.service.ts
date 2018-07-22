import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JsonBean} from '../model/jsonbean';
import {User} from '../model/user';
import {Consts} from '../common/consts';
import {CommonService} from './common.service';

/**
 * 用户服务
 */
@Injectable()
export class UserService extends CommonService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  register(user: User): Observable<JsonBean> {
    return this.httpClient.post(Consts.URL + 'user/register', user, Consts.JSON);
  }

  login(user: User): Observable<JsonBean> {
    // const body = JsUtils.toQueryString(user);
    return this.httpClient.post(Consts.URL + 'user/login', user, Consts.JSON);
  }

  detail(id: string): Observable<JsonBean> {
    return this.httpClient.get(Consts.URL + 'user/detail/' + id);
  }

  updatePasswd(user: User): Observable<JsonBean> {
    return this.httpClient.post(Consts.URL + 'user/updatePassword', user, Consts.JSON);
  }

  updateInfo(user: User): Observable<JsonBean> {
    return this.httpClient.post(Consts.URL + 'user/update', user, Consts.JSON);
  }

  uploadAvatar(userId: string, image: any): Observable<JsonBean> {
    // const body = 'userId=' + userId + '&avatarFile=' + image;
    const data = new FormData();
    data.append('userId', userId);
    data.append('avatarFile', image);
    // 上传文件不要自作多情去添加头部 no multipart boundary was found
    // https://blog.csdn.net/sanjay_f/article/details/47407063
    return this.httpClient.post<JsonBean>(Consts.URL + 'user/avatar', data);
  }
}
