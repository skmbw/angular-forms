// deprecate
import {MatSnackBar} from '@angular/material';

export class JsUtils {
  // 获取滚动条当前的位置
  static getScrollTop() {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  }

  // 获取当前可是范围的高度
  static getClientHeight() {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = Math.min(document.body.clientHeight,
        document.documentElement.clientHeight);
    } else {
      clientHeight = Math.max(document.body.clientHeight,
        document.documentElement.clientHeight);
    }
    return clientHeight;
  }

  // 获取文档完整的高度
  static getScrollHeight() {
    return Math.max(document.body.scrollHeight,
      document.documentElement.scrollHeight);
  }

  static toQueryString(obj: any): string {
    let rs = '';
    for (const p in obj) {
      // for in statement must filtered with an if statement
      if (obj.hasOwnProperty(p)) {
        const v = obj[p];
        if (v !== undefined && v !== null) {
          rs += p + '=' + v + '&';
        }
      }
    }
    return rs.substring(0, rs.length - 1);
  }

  static alert(snackBar: MatSnackBar) {
    snackBar.open('', null, {duration: 2000});
  }
}
