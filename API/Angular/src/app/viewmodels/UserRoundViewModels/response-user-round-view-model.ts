import { RoundStatus } from 'src/app/shared/enums/round-status';

export class ResponseUserRoundViewModel
{
  constructor(roundStatus, points, userId, nickname)
  {
    this.userId = userId;
    this.points = points;
    this.roundStatus = roundStatus;
    this.nickname = nickname;
  }

  public userId: number;
  public roundStatus: RoundStatus;
  public points: number;
  public nickname: string;
}
