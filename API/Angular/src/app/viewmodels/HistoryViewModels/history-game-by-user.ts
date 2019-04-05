export default class HistoryGameByUser {
  constructor(gameId, roundsIds)
  {
    this.gameId = gameId;
    this.roundsIds = roundsIds;
  }
  
  public gameId: number;
  public roundsIds: Array<number>;
}
