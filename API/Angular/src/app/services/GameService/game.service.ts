import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestReplenishCashViewModel } from '../../viewmodels/ReplenishCashViewModels/request-replenish-cash-view-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService
{
  private _url = environment.gameUrl;

  constructor(private _http: HttpClient) { }

  //#region Public Methods
  public gameById(id: number): Observable<Object>
  {
    let result: Observable<Object> = this._http.get(this._url + "gamebyid/" + id);

    return result;
  }

  public dealCards(id: number): Observable<Object>
  {
    let result: Observable<Object> = this._http.post(this._url + "dealcards/" + id, id);

    return result;
  }

  public dealCardToPlayer(id: number): Observable<Object>
  {
    let result: Observable<Object> = this._http.post(this._url + "dealcardstoplayer/" + id, id);

    return result;
  }

  public replenishCash(request: RequestReplenishCashViewModel): Observable<Object>
  {
    let result: Observable<Object> = this._http.post(this._url + "replenishcash", request);

    return result;
  }

  public dealCardsToBots(gameId: number): Observable<Object>
  {
    let result: Observable<Object> = this._http.post(this._url + "dealcardstobots/" + gameId, gameId);

    return result;
  }

  public dealCardsToDealer(id: number): Observable<Object>
  {
    let result: Observable<Object> = this._http.post(this._url + "dealcardstodealer/" + id, id);

    return result;
  }

  public createNewRound(id: number): Observable<Object>
  {
    let result: Observable<Object> = this._http.post(this._url + "createround/" + id, id);

    return result;
  }

  public gameOver(id: number): Observable<Object>
  {
    let result: Observable<Object> = this._http.get(this._url + "gameover/" + id);

    return result;
  }
  //#endregion
}
