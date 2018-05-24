import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {JsonBean} from '../model/jsonbean';
import {Consts} from '../common/consts';
import {CommonService} from './common.service';

@Injectable()
export class ArticleService extends CommonService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  list(page: number): Observable<JsonBean> {
    return this.httpClient.get<JsonBean>(Consts.URL + 'article/list?pageSize=10&page=' + page)
      .pipe(
        catchError(this.handleError('', {}))
      );
  }

  detail(id: string): Observable<JsonBean> {
    return this.httpClient.get<JsonBean>(Consts.URL + 'article/detail/' + id)
      .pipe(
        catchError(this.handleError('', {}))
      );
  }
}
