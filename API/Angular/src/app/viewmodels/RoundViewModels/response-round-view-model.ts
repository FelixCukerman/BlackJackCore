import { ResponseUserRoundViewModel } from '../UserRoundViewModels/response-user-round-view-model';

export class ResponseRoundViewModel
{
  constructor(isOver, roundId, userRound)
  {
    this.roundId = roundId;
    this.isOver = isOver;
    this.userRound = userRound;
  }

  public isOver: boolean;
  public roundId: number;
  public userRound: Array<ResponseUserRoundViewModel>;
}
