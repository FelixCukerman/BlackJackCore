import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';

@Injectable({
  providedIn: 'root'
})
export class StartService
{
  private url = "/api/game";
  constructor(private http: HttpClient) { }

  public CreateNewGame(request: RequestGameViewModel) {
    let result = this.http.post(this.url + "/create", request);
    console.log("create new game");
    return result;
  }
}
