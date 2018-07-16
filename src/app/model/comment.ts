/**
 * 评论实体
 */
export class Comment {
  constructor(public id?: string,
              public content?: string,
              public userId?: string,
              public nickName?: string,
              public commentDate?: string,
              public articleId?: string,
              public type?: number,
              public orders?: number,
              public state?: number) {
  }
}
