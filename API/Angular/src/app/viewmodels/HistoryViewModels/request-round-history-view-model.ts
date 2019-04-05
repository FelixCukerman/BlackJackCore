export default class RequestRoundHistoryViewModel {
  constructor(roundId, gameId) {
    this.roundId = roundId;
    this.gameId = gameId;
  }

  public roundId: number;
  public gameId: number;
}
