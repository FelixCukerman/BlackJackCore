import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { GetTokenViewModel } from 'src/app/viewmodels/AccountViewModels/get-token-view-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = environment.authUrl;

  constructor(private _http: HttpClient, @Inject(LOCAL_STORAGE) private _storage: WebStorageService) { }

  public createToken(username: string): void
  {
    this._http.get(this.url + "token/" + username).subscribe((data: GetTokenViewModel) =>
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
}
