import { UserRole } from '../../shared/enums/user-role'
import { ResponseCardViewModel } from '../CardViewModels/response-card-view-model';

export class ResponseUserViewModel
{
  constructor(id, nickname, userRole, cards, cash)
  {
    this.id = id;
    this.nickname = nickname;
    this.userRole = userRole;
    this.cards = cards;
    this.cash = cash;
  }

  public id: number;
  public nickname: string;
  public cash: number;
  public userRole: UserRole;
  public cards: Array<ResponseCardViewModel>;
}
