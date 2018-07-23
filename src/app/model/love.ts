/**
 * 点赞或者关注model
 */
export class Love {
  constructor(public id?: string,
              public type?: number,
              public category?: number,
              public userId?: string,
              public name?: string,
              public remark?: string,
              public focusNumber?: number,
              public loveNumber?: number,
              public number?: number,
              public despiseNumber?: number,
              public targetId?: string,
              public targetType?: string,
              public state?: number,
              public favoriteDate?: string) {}
}
