export class RequestReplenishCashViewModel {
  constructor(gameId, cash) {
    this.gameId = gameId;
    this.cash = cash;
  }

  public gameId: number;
  public cash: number;
}
