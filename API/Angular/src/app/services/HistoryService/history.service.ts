import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private url = environment.historyUrl;

  constructor(private _http: HttpClient) { }

  public getUsersForAutocomplete(): Observable<Object>
  {
    let result = this._http.get(this.url + "getpersons");

    return result;
  }

  public getGamesByUser(userId: number): Observable<Object>
  {
    let result = this._http.get(this.url + "gamesbyuser/" + userId);

    return result;
  }

  public getGameDetails(gameId: number): Observable<Object>
  {
    let result = this._http.get(this.url + "gamedetails/" + gameId);

    return result;
  }
}
