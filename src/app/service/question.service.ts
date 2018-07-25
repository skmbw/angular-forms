import {Injectable} from '@angular/core';
import {Question} from '../model/question';
import {Observable} from 'rxjs/index';
import {JsonBean} from '../model/jsonbean';
import {HttpClient} from '@angular/common/http';
import {Consts} from '../common/consts';
import {catchError} from 'rxjs/internal/operators';
import {CommonService} from './common.service';
import {JsUtils} from '../common/js-utils';
import {Answer} from '../model/answer';

/**
 * 问题服务
 */
@Injectable()
export class QuestionService extends CommonService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public list(question: Question): Observable<JsonBean> {
    const params = JsUtils.toQueryString(question);
    return this.httpClient.get<JsonBean>(Consts.URL + 'question/list?' + params)
      .pipe(catchError(this.handleError()));
  }

  public save(question: Question): Observable<JsonBean> {
    // 表单请求
    return this.httpClient.post(Consts.URL + 'question/ask', question, Consts.JSON)
      .pipe(catchError(this.handleError()));
  }

  public detail(id: string): Observable<JsonBean> {
    return this.httpClient.get<JsonBean>(Consts.URL + 'question/detail/' + id).pipe();
  }

  saveRightAnswer(answer: Answer): Observable<JsonBean> {
    return this.post(Consts.URL + 'question/bestAnswer', answer).pipe();
  }
}
