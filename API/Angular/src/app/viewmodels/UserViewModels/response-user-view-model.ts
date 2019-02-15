import { UserRole } from '../../shared/enums/user-role'
import { ResponseCardViewModel } from '../CardViewModels/response-card-view-model';

export class ResponseUserViewModel
{
  constructor(id, nickname, userRole, cards)
  {
    this.id = id;
    this.nickname = nickname;
    this.userRole = userRole;
    this.cards = cards;
  }

  public id: number;
  public nickname: string;
  public userRole: UserRole;
  public cards: Array<ResponseCardViewModel>;
}
