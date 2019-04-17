import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AccountService } from '../../services/AccountService/account-service.service';

@Injectable()
export class AuthGuard implements CanActivate
{
  constructor(private _auth: AccountService, private _router: Router) { }

  public canActivate(): boolean
  {
    let isAuthenticated: boolean = this._auth.checkAuthenticated();

    if (!isAuthenticated)
    {
      this._router.navigate(['start']);
    }

    return isAuthenticated;
  }
}
