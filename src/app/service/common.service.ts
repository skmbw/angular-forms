import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JsonBean} from '../model/jsonbean';
import {JsUtils} from '../common/js-utils';
import {Consts} from '../common/consts';

/**
 * 公共服务的一些抽象啊
 */
export class CommonService {

  constructor(private http: HttpClient) {
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * 以表单方式提交
   * @param {string} url
   * @param body
   * @returns {Observable<JsonBean>}
   */
  post(url: string, body: any): Observable<JsonBean> {
    const params = JsUtils.toQueryString(body);
    return this.http.post<JsonBean>(url, params, {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}),
      responseType: 'json'
    }).pipe();
  }

  /**
   * 以json方式提交
   * @param {string} url
   * @param body
   * @returns {Observable<JsonBean>}
   */
  postJson(url: string, body: any): Observable<JsonBean> {
    return this.http.post(url, body, Consts.JSON).pipe();
  }

  /**
   * 使用es6的FormData的方式，上传文件和普通表单域
   * @param {string} url
   * @param {FormData} formData
   * @returns {Observable<JsonBean>}
   */
  postForm(url: string, formData: FormData): Observable<JsonBean> {
    return this.http.post(url, formData, {
      headers: new HttpHeaders({'Content-Type': 'multipart/form-data;charset=utf-8;boundary=skmbw_mp_' + (Math.random() * 10)}),
      responseType: 'json'
    }).pipe();
  }
}
