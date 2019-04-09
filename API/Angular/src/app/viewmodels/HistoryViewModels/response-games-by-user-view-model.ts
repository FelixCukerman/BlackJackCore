export default class ResponseGamesByUserViewModel {
  constructor(gameId, roundsIds) {
    this.gameId = gameId;
    this.roundsIds = roundsIds;
  }

  public gameId: number;
  public roundsIds: Array<number>;
}
