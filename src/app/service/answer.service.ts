import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Answer} from '../model/answer';
import {Observable} from 'rxjs/index';
import {JsonBean} from '../model/jsonbean';
import {Consts} from '../common/consts';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private httpClient: HttpClient) {
  }

  save(answer: Answer): Observable<JsonBean> {
    return this.httpClient.post<JsonBean>(Consts.URL + 'answer/doAdd', answer, Consts.JSON).pipe();
  }

  list(answer: Answer): Observable<JsonBean> {
    return this.httpClient.post<JsonBean>(Consts.URL + 'answer/list', answer, Consts.JSON).pipe();
  }
}
