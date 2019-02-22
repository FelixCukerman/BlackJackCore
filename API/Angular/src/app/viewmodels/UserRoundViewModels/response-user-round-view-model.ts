import { RoundStatus } from 'src/app/shared/enums/round-status';

export class ResponseUserRoundViewModel
{
  constructor(roundStatus, userId, nickname, points)
  {
    this.userId = userId;
    this.roundStatus = roundStatus;
    this.nickname = nickname;
    this.points = points;
  }

  public userId: number;
  public roundStatus: RoundStatus;
  public nickname: string;
  public points: number;
}
