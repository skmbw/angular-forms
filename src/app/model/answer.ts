export class Answer {
  constructor(public id?: string,
              public content?: string,
              public questionId?: string,
              public targetId?: string,
              public nickName?: string,
              public avatar?: string,
              public summary?: string,
              public platform?: string,
              public answerUserId?: string,
              public income?: number,
              public answerDate?: string,
              public accept?: number,
              public state?: number,
              public open?: boolean,
              public ownerId?: string,
              public focusNumber: number = 0,
              public loveNumber: number = 0,
              public despiseNumber: number = 0,
              // Parameter cannot have question mark and initializer
              // 有默认值就不需要有？号了
              public pageSize: number = 20,
              public page: number = 1) {}
}
