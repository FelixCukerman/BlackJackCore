import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { GetTokenViewModel } from 'src/app/viewmodels/AccountViewModels/get-token-view-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = "/api/auth/";
  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  public CreateToken(username: string)
  {
    let token: string;
    this.http.get(this.url + "token/" + username).subscribe((data: GetTokenViewModel) =>
    {
      token = data.accessToken;
      this.storage.set('token', token);
    });
  }

  public GetToken()
  {
    return this.storage.get('token');
  }

  public GetCurrentUsername(): string {
    return this.storage.get('username');
  }
}
