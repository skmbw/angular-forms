import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators';
import {JsonBean} from '../model/jsonbean';

const PREFIX = 'http://10.0.30.233:8243/tianxun/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'text/json'})
};

@Injectable()
export class ArticleService {

  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<JsonBean> {
    return this.httpClient.get<JsonBean>(PREFIX + 'article/list')
      .pipe(
        catchError(this.handleError('', {}))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
