import {HttpHeaders} from '@angular/common/http';

export class Consts {
  static URL_TIANXUN = 'http://10.0.30.233:8243/tianxun/';
  static URL = 'http://10.0.30.233:8040/tianxun-api/';
  static IMAGE_HOST = 'http://10.0.30.233:8300/';
  static JSON = {
    headers: new HttpHeaders({'Content-Type': 'text/json'})
  };
}
