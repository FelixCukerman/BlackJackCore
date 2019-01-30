import { UserRole } from '../../shared/enums/user-role'
import { ResponseCardViewModel } from '../CardViewModels/response-card-view-model';

export class ResponseUserViewModel
{
  constructor(nickname, userRole, cards)
  {
    this.nickname = nickname;
    this.userRole = userRole;
    this.cards = cards;
  }

  public nickname: string;
  public userRole: UserRole;
  public cards: Array<ResponseCardViewModel>;
}
