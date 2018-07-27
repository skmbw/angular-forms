import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Answer} from '../model/answer';
import {Observable} from 'rxjs/index';
import {JsonBean} from '../model/jsonbean';
import {Consts} from '../common/consts';
import {Dialogue} from '../model/dialogue';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService extends CommonService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  save(answer: Answer): Observable<JsonBean> {
    return this.httpClient.post<JsonBean>(Consts.URL + 'answer/doAdd', answer, Consts.JSON).pipe();
  }

  list(answer: Answer): Observable<JsonBean> {
    return this.httpClient.post<JsonBean>(Consts.URL + 'answer/list', answer, Consts.JSON).pipe();
  }

  getQuestionAnswer(questionId: string): Observable<JsonBean> {
    return this.httpClient.get(Consts.URL + 'answer/rightAnswer?questionId=' + questionId).pipe();
  }

  detailList(dialog: Dialogue): Observable<JsonBean> {
    return this.httpClient.post<JsonBean>(Consts.URL + 'dialogue/list', dialog).pipe();
  }

  delete(answer: Answer): Observable<JsonBean> {
    return this.post(Consts.URL + 'answer/delete', {'id': answer.id});
  }
}
