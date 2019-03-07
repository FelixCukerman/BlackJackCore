import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestReplenishCashViewModel } from '../../viewmodels/ReplenishCashViewModels/request-replenish-cash-view-model';

@Injectable({
  providedIn: 'root'
})
export class GameService
{
  private url = "/api/game";
  constructor(private http: HttpClient) { }

  public GameById(id: number)
  {
    return this.http.get(this.url + "/gamebyid/" + id);
  }

  public DealCards(id: number)
  {
    return this.http.post(this.url + "/dealcards/" + id, id);
  }

  public DealCardToPlayer(id: number)
  {
    return this.http.post(this.url + "/dealcardstoplayer/" + id, id)
  }

  public ReplenishCash(request: RequestReplenishCashViewModel)
  {
    let result = this.http.post(this.url + "/replenishcash", request);
    return result;
  }

  public DealCardsToBots(gameId: number)
  {
    let result = this.http.post(this.url + "/dealcardstobots/" + gameId, gameId);
    return result;
  }

  public DealCardsToDealer(id: number)
  {
    let result = this.http.post(this.url + "/dealcardstodealer/" + id, id);
    return result;
  }

  public CreateNewRound(id: number) {
    let result = this.http.post(this.url + "/createround/" + id, id);
    return result;
  }

  public GameOver(id: number) {
    let result = this.http.get(this.url + "/gameover/" + id);
    return result;
  }
}
