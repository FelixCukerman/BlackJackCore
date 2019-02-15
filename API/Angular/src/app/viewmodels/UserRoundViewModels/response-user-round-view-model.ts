import { RoundStatus } from 'src/app/shared/enums/round-status';

export class ResponseUserRoundViewModel
{
  constructor(roundStatus, points, userId)
  {
    this.userId = userId;
    this.points = points;
    this.roundStatus = roundStatus;
  }

  public userId: number;
  public roundStatus: RoundStatus;
  public points: number;
}
