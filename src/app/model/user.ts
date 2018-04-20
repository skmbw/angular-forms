/**
 * 用户
 */
export class User {
  constructor(public name?: string,
              public password?: string,
              public checkPasswd?: string,
              public account?: string,
              public mobile?: string,
              public authCode?: string,
              public gender?: number) {

  }
}
