export class RequestReplenishCashViewModel {
  constructor(userId, cash) {
    this.userId = userId;
    this.cash = cash;
  }

  public userId: number;
  public cash: number;
}
