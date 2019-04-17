import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { GetTokenViewModel } from 'src/app/viewmodels/AccountViewModels/get-token-view-model';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

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
      this._storage.set('token', token);
    });
  }

  public getToken(): string
  {
    let token: string = this._storage.get('token');

    return token;
  }

  public getCurrentUsername(): string
  {
    let username: string = this._storage.get('username');

    return username;
  }

  public checkAuthenticated(): boolean
  {
    let token: string = this._storage.get('token');

    let tokenExpired: boolean = this._jwtHelper.isTokenExpired(token);

    return !tokenExpired;
  }

  public checkUserRole(): boolean
  {
    try
    {
      let token: string = this._storage.get('token');

      let decodedToken: any = this._jwtHelper.decodeToken(token);

      let isPeople: boolean = decodedToken.userRole == 'People';

      return isPeople;
    }
    catch (exception)
    {
      return false;
    }
  }
  //#endregion
}
