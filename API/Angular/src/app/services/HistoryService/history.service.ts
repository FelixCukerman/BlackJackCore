import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private url = "/api/history/";
  constructor(private http: HttpClient) { }

  public GetUsersForAutocomplete()
  {
    let result = this.http.get(this.url + "getpersons");
    return result;
  }

  public GetGamesByUser(userId: number) {
    let result = this.http.get(this.url + "gamesbyuser/" + userId);
    return result;
  }
}
