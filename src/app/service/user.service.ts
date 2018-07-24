import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    super(httpClient);
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
    const form = new FormData();
    form.append('userId', userId);
    form.set('avatarFile', image,  (Math.random() * 10) + '_image.jpeg');
    // 上传文件不要去添加头部 no multipart boundary was found
    // https://blog.csdn.net/sanjay_f/article/details/47407063
    // 那些觉得错误是自作多情造成的同学一看就是没有理解文件上传原理的，错误明明告诉你了没有设置boundary边界，
    // 正确的消息头应该是'Content-Type':'multipart/form-data;boundary='+随机数,
    // 而误打误撞删了Content-Type就成功的同学只能说浏览器默认帮你加上了正确的消息头运气好而已，
    // 如果Content-Typ默认不是multipart/form-data类型的又会报Current request is not a multipart request的错误
    return this.httpClient.post<JsonBean>(Consts.URL + 'user/avatar', form);
  }
}
