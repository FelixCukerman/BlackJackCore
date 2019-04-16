import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AccountService } from '../services/AccountService/account-service.service';

@Injectable()
export class AuthGuard implements CanActivate
{
  constructor(private _auth: AccountService, private _router: Router) { }

  public canActivate(): boolean
  {
    if (!this._auth.checkAuthenticated())
    {
      this._router.navigate(['start']);
    }
    return this._auth.checkAuthenticated();
  }
}
