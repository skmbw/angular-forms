/**
 * 问题实体
 */
import {Answer} from './answer';

export class Question {
  constructor(public id?: string,
              public title?: string,
              public content?: string,
              public askDate?: string,
              public answerDate?: string,
              public closeDate?: string,
              public asker?: string,
              public askerName?: string,
              public summary?: string,
              public price?: number,
              public fee?: number,
              public solved?: boolean,
              public open?: boolean,
              public platform?: number,
              public category?: string,
              public categoryCode?: number,
              public satisfiedAnswerId?: string,
              public satisfiedUserId?: string,
              public satisfiedUserName?: string,
              public state?: number,
              public deleted?: boolean,
              public deleteDate?: string,
              public number?: number,
              public answerNumber?: number,
              public focusNumber?: number,
              public loveNumber?: number,
              public despiseNumber?: number,
              public serviceType?: number,
              public terminal?: number,
              public filePath?: string,
              public type?: string,
              public account?: string,
              public page?: number,
              public pageSize?: number,
              public ids?: string[],
              public answer?: Answer) {

  }
}
