/**
 * 用户
 */
export class User {
  constructor(public id?: string,
              public name?: string,
              public password?: string,
              public oldPassword?: string,
              public checkPasswd?: string,
              public account?: string,
              public mobile?: string,
              public license?: string,
              public gender?: number,
              public tokenId?: string,
              public title?: string,
              public avatar?: string,
              public summary?: string,
              public birthday?: string,
              public signature?: string,
              public nickName?: string,
              public weixin?: string,
              public alipay?: string,
              public email?: string,
              public identityCard?: string) {

  }
}
