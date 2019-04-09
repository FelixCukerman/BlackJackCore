import ResponseRoundDetailsViewModel from './response-round-details-view-model';
import HistoryGameStatisticViewModel from './history-game-statistic-view-model';

export default class ResponseGameDetailsViewModel {
  constructor(rounds, statistic) {
    this.rounds = rounds;
    this.statistic = statistic;
  }

  public rounds: Array<ResponseRoundDetailsViewModel>;
  public statistic: Array<HistoryGameStatisticViewModel>;
}
