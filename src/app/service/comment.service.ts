import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './common.service';
import {Observable} from 'rxjs/index';
import {JsonBean} from '../model/jsonbean';
import {Comment} from '../model/comment';
import {Consts} from '../common/consts';
import {catchError} from 'rxjs/operators';

@Injectable()
export class CommentService extends CommonService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  save(comment: Comment): Observable<JsonBean> {
    return this.httpClient.post<JsonBean>(Consts.URL + 'comment/doAdd', comment, Consts.JSON)
      .pipe(catchError(this.handleError('', {})));
  }

  list(comment: Comment): Observable<JsonBean> {
    return this.httpClient.post<JsonBean>(Consts.URL + 'comment/list', comment, Consts.JSON)
      .pipe(catchError(this.handleError('', {})));
  }

  delete(comment: Comment): Observable<JsonBean> {
    return this.post(Consts.URL + 'comment/delete', {'id': comment.id});
  }
}
