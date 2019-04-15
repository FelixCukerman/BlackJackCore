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

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  public CreateToken(username: string): void
  {
    this.http.get(this.url + "token/" + username).subscribe((data: GetTokenViewModel) =>
    {
      let token: string = data.accessToken;
      this.storage.set('token', token);
    });
  }

  public GetToken(): string
  {
    let token: string = this.storage.get('token');

    return token;
  }

  public GetCurrentUsername(): string
  {
    let username: string = this.storage.get('username');

    return username;
  }
}
