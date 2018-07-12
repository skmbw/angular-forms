import {Injectable} from '@angular/core';
import {User} from '../model/user';

const TOKEN_ID = 'sess_token_id';
const USER_ID = 'sess_user_id';
const USER_INFO = 'sess_user_info';
const USER_NAME = 'sess_user_name';

@Injectable()
export class TokenStorage {
  constructor() {
  }

  public logout() {
    window.sessionStorage.removeItem(TOKEN_ID);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    // window.sessionStorage.removeItem(TOKEN_ID); // 会导致刷新页面，sessionStorage失效
    window.sessionStorage.setItem(TOKEN_ID, token);
  }

  public getToken(): string {
    // localStorage 在浏览器关闭时，不清楚数据，除非主动清除
    // return localStorage.getItem(TOKEN_ID);
    // sessionStorage 在浏览器关闭时，会清除数据
    return window.sessionStorage.getItem(TOKEN_ID);
  }

  public saveUser(user: User) {
    window.sessionStorage.setItem(USER_ID, user.id);
    window.sessionStorage.setItem(USER_INFO, JSON.stringify(user));
    window.sessionStorage.setItem(USER_NAME, user.account);
  }

  public getUser(): User {
    const us = window.sessionStorage.getItem(USER_INFO);
    return JSON.parse(us);
  }

  public getUserId(): string {
    return window.sessionStorage.getItem(USER_ID);
  }

  public getAccount(): string {
    return window.sessionStorage.getItem(USER_NAME);
  }
}
