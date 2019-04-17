import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AccountService } from '../../services/AccountService/account-service.service';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private _auth: AccountService, private _router: Router) { }

  public canActivate(): boolean
  {
    let isPeople: boolean = this._auth.checkUserRole();

    if (!isPeople)
    {
      this._router.navigate(['start']);
    }

    return isPeople;
  }
}
