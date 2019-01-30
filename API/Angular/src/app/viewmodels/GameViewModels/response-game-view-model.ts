import { ResponseRoundViewModel } from '../RoundViewModels/response-round-view-model';
import { ResponseUserViewModel } from '../UserViewModels/response-user-view-model';

export default class ResponseGameViewModel
{
  constructor(id, users, rounds, isOver)
  {
    this.id = id;
    this.users = users;
    this.rounds = rounds;
    this.isOver = isOver;
  }

  public id: number;
  public users: Array<ResponseUserViewModel>;
  public rounds: Array<ResponseRoundViewModel>;
  public isOver: boolean;
}
