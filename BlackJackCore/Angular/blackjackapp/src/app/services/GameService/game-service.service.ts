import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';

@Injectable({
  providedIn: 'root'
})
export class GameService
{
  private url = "/api/game";
  constructor(private http: HttpClient) { }

  public CreateNewGame(request: RequestGameViewModel)
  {
    return this.http.post(this.url + "/create", request);
  }
}
