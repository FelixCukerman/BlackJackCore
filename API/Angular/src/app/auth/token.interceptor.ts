import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/AccountService/account-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{
  constructor(private _auth: AccountService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    let token: string = this._auth.getToken();

    if (!token)
    {
      let username: string = this._auth.getCurrentUsername();

      this._auth.createToken(username);

      return Observable.create();
    }

    request = request.clone({
      setHeaders:
      {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(request);
  }
}
