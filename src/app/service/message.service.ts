import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/index';
import {Answer} from '../model/answer';
import {Comment} from '../model/comment';

@Injectable()
export class MessageService {

  constructor() {
  }

  private subject = new Subject<any>();
  private commentSubject = new Subject<any>();
  private answerSubject = new Subject<any>();
  private replySubject = new Subject<any>();
  private dialogueSubject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({text: message});
  }

  sendAnswer(message: Answer) {
    this.answerSubject.next({text: message});
  }

  sendComment(message: Comment) {
    this.commentSubject.next({text: message});
  }

  sendReply(message: any) {
    this.replySubject.next({text: message});
  }

  sendDialog(message: any) {
    this.dialogueSubject.next({text: message});
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getComment(): Observable<any> {
    return this.commentSubject.asObservable();
  }

  getAnswer(): Observable<any> {
    return this.answerSubject.asObservable();
  }

  getReply(): Observable<any> {
    return this.replySubject.asObservable();
  }

  getDialogue(): Observable<any> {
    return this.dialogueSubject.asObservable();
  }
}
