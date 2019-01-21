import { ResponseRoundViewModel } from '../RoundViewModels/response-round-view-model';
import { ResponseUserViewModel } from '../UserViewModels/response-user-view-model';

export default class ResponseGameViewModel
{
  constructor(Users, Rounds, IsOver)
  {
    this.Users = Users;
    this.Rounds = Rounds;
    this.IsOver = IsOver;
  }

  public Users: Array<ResponseUserViewModel>;
  public Rounds: Array<ResponseRoundViewModel>;
  public IsOver: boolean;
}
