import {HttpHeaders} from '@angular/common/http';

export class Consts {
  static URL_TIANXUN = 'http://localhost:8243/tianxun/';
  static URL = 'http://localhost:8040/tianxun-api/';
  static IMAGE_HOST = 'http://localhost:8300/';
  static IMAGE_URL = 'localhost:8300/';
  static JSON = {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})
  };
  static FORM = {
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
  };

  static FORM_JSON = {
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}),
    responseType: 'json'
  };
}
