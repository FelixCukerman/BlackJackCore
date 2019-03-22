import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = "/api/auth/";
  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  public CreateToken(username: string)
  {
    return this.http.get(this.url + "token/" + username);
  }

  public GetToken()
  {
    return this.storage.get('token');
  }
}
