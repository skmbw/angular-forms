import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/index';
import {Answer} from '../model/answer';

@Injectable()
export class MessageService {

  constructor() { }

  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  sendAnswer(message: Answer) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
