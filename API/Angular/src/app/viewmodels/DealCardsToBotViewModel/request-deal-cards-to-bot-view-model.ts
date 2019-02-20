export class RequestDealCardsToBotViewModel {
  constructor(userId, gameId) {
    this.userId = userId;
    this.gameId = gameId;
  }

  public userId: number;
  public gameId: number;
}
