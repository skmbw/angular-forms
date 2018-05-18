import {Injectable} from '@angular/core';

const TOKEN_ID = 'sess_token_id';

@Injectable()
export class TokenStorage {
  constructor() {
  }

  public logout() {
    window.sessionStorage.removeItem(TOKEN_ID);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_ID);
    window.sessionStorage.setItem(TOKEN_ID, token);
  }

  public getToken(): string {
    // localStorage 在浏览器关闭时，不清楚数据，除非主动清除
    // return localStorage.getItem(TOKEN_ID);
    // sessionStorage 在浏览器关闭时，会清除数据
    return window.sessionStorage.getItem(TOKEN_ID);
  }
}
