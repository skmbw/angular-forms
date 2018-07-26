/**
 * 对话实体
 */
export class Dialogue {
  constructor(public id?: string,
              public userId?: string,
              public nickName?: string,
              public dialogDate?: string,
              public answerId?: string,
              public questionId?: string,
              public state?: number,
              public open?: boolean,
              public content?: string) {}
}
