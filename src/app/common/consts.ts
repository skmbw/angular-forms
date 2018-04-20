import {HttpHeaders} from '@angular/common/http';

export class Consts {
  static URL = 'http://10.0.30.233:8243/tianxun/';
  static JSON = {
    headers: new HttpHeaders({'Content-Type': 'text/json'})
  };
}
