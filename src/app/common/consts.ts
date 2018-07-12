import {HttpHeaders} from '@angular/common/http';

export class Consts {
  static URL_TIANXUN = 'http://10.0.30.233:8243/tianxun/';
  static URL = 'http://localhost:8040/tianxun-api/';
  static IMAGE_HOST = 'http://10.0.30.233:8300/';
  static IMAGE_URL = '10.0.30.233:8300/';
  static JSON = {
    headers: new HttpHeaders({'Content-Type': 'text/json;charset=utf-8'})
  };
  static FORM = {
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'})
  };

  static FORM_JSON = {
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}),
    responseType: 'json'
  };
}
