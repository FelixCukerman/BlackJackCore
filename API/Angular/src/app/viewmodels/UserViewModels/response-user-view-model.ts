import { UserRole } from '../../shared/enums/user-role'
import { ResponseCardViewModel } from '../CardViewModels/response-card-view-model';

export class ResponseUserViewModel
{
  constructor(Nickname, UserRole, Cards)
  {
    this.Nickname = Nickname;
    this.UserRole = UserRole;
    this.Cards = Cards;
  }

  public Nickname: string;
  public UserRole: UserRole;
  public Cards: Array<ResponseCardViewModel>;
}
