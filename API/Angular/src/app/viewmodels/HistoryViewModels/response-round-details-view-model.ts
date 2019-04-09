import ResponseUserRoundDetailsViewModel from './response-user-round-details-view-model';

export default class ResponseRoundDetailsViewModel {
  constructor(round) {
    this.round = round;
  }

  public round: Array<ResponseUserRoundDetailsViewModel>;
}
