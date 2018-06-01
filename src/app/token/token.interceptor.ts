import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TokenStorage} from './token.storage';
import {Router} from '@angular/router';
import {tap} from 'rxjs/internal/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorage, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    const token = this.tokenStorage.getToken();
    if (token !== null) {
      // request = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer' + token)});
      if (req.url.indexOf('github.com') === -1) { // github不能带这个参数，自己的业务带上，这个是测试，后面会去掉
        request = req.clone({headers: req.headers.set('tokenId', token)});
      }
    }
    // do->tap，同时编程function了
    return next.handle(request).pipe(tap((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/login']).catch();
        }
      }
    }));
  }

}
