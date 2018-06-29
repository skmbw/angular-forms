import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {JsonBean} from '../model/jsonbean';
import {Consts} from '../common/consts';
import {CommonService} from './common.service';
import {Article} from '../model/article';

@Injectable()
export class ArticleService extends CommonService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  list(page: number): Observable<JsonBean> {
    return this.httpClient.get<JsonBean>(Consts.URL + 'article/list?pageSize=20&page=' + page)
      .pipe(
        catchError(this.handleError('', {}))
      );
  }

  detail(id: string): Observable<JsonBean> {
    return this.httpClient.get<JsonBean>(Consts.URL + 'article/detail/' + id)
      .pipe(catchError(this.handleError('', {})));
  }

  save(article: Article): Observable<JsonBean> {
    return this.httpClient.post<JsonBean>(Consts.URL + 'article/doAdd', article, Consts.JSON)
      .pipe(catchError(this.handleError('', {})));
  }
}
