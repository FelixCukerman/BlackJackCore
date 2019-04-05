import { UserRole } from 'src/app/shared/enums/user-role';
import { RoundStatus } from 'src/app/shared/enums/round-status';
import { ResponseCardViewModel } from '../CardViewModels/response-card-view-model';

export default class HistoryUserRoundViewModel
{
  constructor(userId, nickname, userRole, points, roundStatus, cards)
  {
    this.userId = userId;
    this.nickname = nickname;
    this.userRole = userRole;
    this.points = points;
    this.roundStatus = roundStatus;
    this.cards = cards;
  }

  public userId: number;
  public nickname: string;
  public userRole: UserRole;
  public points: number;
  public roundStatus: RoundStatus;
  public cards: Array<ResponseCardViewModel>;
}
