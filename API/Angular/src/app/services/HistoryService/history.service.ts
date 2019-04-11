import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private url = environment.historyUrl;

  constructor(private http: HttpClient) { }

  public GetUsersForAutocomplete(): Observable<Object>
  {
    let result = this.http.get(this.url + "getpersons");

    return result;
  }

  public GetGamesByUser(userId: number): Observable<Object>
  {
    let result = this.http.get(this.url + "gamesbyuser/" + userId);

    return result;
  }

  public GetGameDetails(gameId: number): Observable<Object>
  {
    let result = this.http.get(this.url + "gamedetails/" + gameId);

    return result;
  }
}
