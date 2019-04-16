import 'rxjs/add/operator/do';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/AccountService/account-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor
{
  constructor(private _accountService: AccountService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return next.handle(request).do((event: HttpEvent<any>) =>
    {
      if (event instanceof HttpResponse) { }
    }, (error: any) =>
    {
      if (error instanceof HttpErrorResponse)
      {
        if (error.status === 401)
        {
          let username: string = this._accountService.getCurrentUsername();

          this._accountService.createToken(username);
        }
      }
    });
  }
}
