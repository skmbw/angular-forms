import {Injectable} from '@angular/core';
import {Question} from '../model/question';
import {Observable} from 'rxjs/index';
import {JsonBean} from '../model/jsonbean';
import {HttpClient} from '@angular/common/http';
import {Consts} from '../common/consts';
import {catchError} from 'rxjs/internal/operators';
import {CommonService} from './common.service';
import {JsUtils} from '../common/js-utils';

/**
 * 问题服务
 */
@Injectable()
export class QuestionService extends CommonService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public list(question: Question): Observable<JsonBean> {
    return this.httpClient.get<JsonBean>(Consts.URL + 'question/list?pageSize=20')
      .pipe(catchError(this.handleError()));
  }

  public save(question: Question): Observable<JsonBean> {
    // 表单请求
    return this.httpClient.post(Consts.URL + 'question/ask', JsUtils.toQueryString(question), Consts.FORM)
      .pipe(catchError(this.handleError()));
  }

  public detail(id: string): Observable<JsonBean> {
    return this.httpClient.get<JsonBean>(Consts.URL + 'question/detail/' + id).pipe();
  }
}