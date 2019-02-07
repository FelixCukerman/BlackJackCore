import { RoundStatus } from 'src/app/shared/enums/round-status';

export class ResponseUserRoundViewModel
{
  constructor(roundStatus, points)
  {
    this.points = points;
    this.roundStatus = roundStatus;
  }

  public roundStatus: RoundStatus;
  public points: number;
}
