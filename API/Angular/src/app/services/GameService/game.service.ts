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
  private url = environment.gameUrl;

  constructor(private http: HttpClient) { }

  public GameById(id: number): Observable<Object>
  {
    let result = this.http.get(this.url + "gamebyid/" + id);

    return result;
  }

  public DealCards(id: number): Observable<Object>
  {
    let result = this.http.post(this.url + "dealcards/" + id, id);

    return result;
  }

  public DealCardToPlayer(id: number): Observable<Object>
  {
    let result = this.http.post(this.url + "dealcardstoplayer/" + id, id);

    return result;
  }

  public ReplenishCash(request: RequestReplenishCashViewModel): Observable<Object>
  {
    let result = this.http.post(this.url + "replenishcash", request);

    return result;
  }

  public DealCardsToBots(gameId: number): Observable<Object>
  {
    let result = this.http.post(this.url + "dealcardstobots/" + gameId, gameId);

    return result;
  }

  public DealCardsToDealer(id: number): Observable<Object>
  {
    let result = this.http.post(this.url + "dealcardstodealer/" + id, id);

    return result;
  }

  public CreateNewRound(id: number): Observable<Object>
  {
    let result = this.http.post(this.url + "createround/" + id, id);

    return result;
  }

  public GameOver(id: number): Observable<Object>
  {
    let result = this.http.get(this.url + "gameover/" + id);

    return result;
  }
}
