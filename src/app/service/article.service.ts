import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {JsonBean} from '../model/jsonbean';
import {Consts} from '../common/consts';
import {CommonService} from './common.service';
import {Article} from '../model/article';
import {JsUtils} from '../common/js-utils';

@Injectable()
export class ArticleService extends CommonService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  list(article: Article): Observable<JsonBean> {
    const body = JsUtils.toQueryString(article);
    return this.httpClient.post<JsonBean>(Consts.URL + 'article/list', body,
      {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;'}),
        responseType: 'json'
      }).pipe();
  }

  detail(id: string): Observable<JsonBean> {
    return this.httpClient.get<JsonBean>(Consts.URL + 'article/detail/' + id)
      .pipe(catchError(this.handleError('', {})));
  }

  save(article: Article): Observable<JsonBean> {
    let url = Consts.URL;
    if (article.id !== undefined && article.id !== null) {
      url += 'article/update';
    } else {
      url += 'article/doAdd';
    }
    return this.postJson(url, article);
  }

  delete(article: Article): Observable<JsonBean> {
    return this.post(Consts.URL + 'article/delete', {'id': article.id});
  }

  update(article: Article): Observable<JsonBean> {
    return this.postJson(Consts.URL + 'article/update', article);
  }
}
