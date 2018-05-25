/**
 * 用户
 */
export class User {
  constructor(public id?: string,
              public name?: string,
              public password?: string,
              public checkPasswd?: string,
              public account?: string,
              public mobile?: string,
              public license?: string,
              public gender?: number,
              public tokenId?: string,
              public title?: string) {

  }
}
