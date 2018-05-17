import {HttpHeaders} from '@angular/common/http';

export class Consts {
  static URL = 'http://10.0.30.233:8243/tianxun/';
  static IMAGE_HOST = 'http://10.0.30.233:8300/';
  static JSON = {
    headers: new HttpHeaders({'Content-Type': 'text/json'})
  };
}
