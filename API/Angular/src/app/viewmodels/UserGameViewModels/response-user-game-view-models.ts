export class ResponseUserGameViewModel {
  constructor(userId, gameId, rate) {
    this.userId = userId;
    this.gameId = gameId;
    this.rate = rate;
  }

  public userId: number;
  public gameId: number;
  public rate: number;
}
