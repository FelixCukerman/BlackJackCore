import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { GetTokenViewModel } from 'src/app/viewmodels/AccountViewModels/get-token-view-model';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedTokenViewModel } from 'src/app/viewmodels/AccountViewModels/decoded-token-view-model';
import { jwtConstant } from 'src/app/shared/constants/jwt-constants';

//#region Constants
const peopleRole: string = 'People';
const tokenKey: string = 'token';
const usernameKey: string = 'username';
//#endregion

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _url = environment.authUrl;

  constructor(private _http: HttpClient, private _handler: HttpBackend, @Inject(LOCAL_STORAGE) private _storage: WebStorageService, private _jwtHelper: JwtHelperService)
  {
    this._http = new HttpClient(this._handler);
  }

  //#region Public Methods
  public createToken(username: string): void
  {
    this._http.get(this._url + "token/" + username).subscribe((data: GetTokenViewModel) =>
    {
      let token: string = data.accessToken;
      this._storage.set(tokenKey, token);
    });
  }

  public getToken(): string
  {
    let token: string = this._storage.get(tokenKey);

    return token;
  }

  public getCurrentUsername(): string
  {
    let username: string = this._storage.get(usernameKey);

    return username;
  }

  public checkAuthenticated(): boolean
  {
    let token: string = this._storage.get(tokenKey);

    let tokenExpired: boolean = this._jwtHelper.isTokenExpired(token);

    return !tokenExpired;
  }

  public checkUserRole(): boolean
  {
    try
    {
      let token: string = this._storage.get(tokenKey);
      let decodedToken: any = this._jwtHelper.decodeToken(token);
      let jwt: string = JSON.stringify(decodedToken);
      let parsedToken: DecodedTokenViewModel = JSON.parse(jwt);

      let isPeople: boolean = parsedToken[jwtConstant.userRole] == peopleRole;

      return isPeople;
    }
    catch (exception)
    {
      return false;
    }
  }
  //#endregion
}
