import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import RequestRoundHistoryViewModel from 'src/app/viewmodels/HistoryViewModels/request-round-history-view-model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private url = "/api/history/";
  constructor(private http: HttpClient) { }

  public GetUsersForAutocomplete()
  {
    let result = this.http.get(this.url + "getusers");
    return result;
  }

  public GetRoundIdsByGame(gameId: number)
  {
    let result = this.http.get(this.url + "roundsbygameid/" + gameId);
    return result;
  }

  public GetAllGameIdsByUser(userId: number)
  {
    let result = this.http.get(this.url + "allgamesbyuser/" + userId);
    return result;
  }

  public GetHistoryUserRounds(request: RequestRoundHistoryViewModel)
  {
    let result = this.http.post(this.url + "roundhistory", request);
    return result;
  }

  public GetGameStatistic(gameId: number) {
    let result = this.http.get(this.url + "gamestatistic/" + gameId);
    return result;
  }
}
