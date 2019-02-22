import { ResponseRoundViewModel } from '../RoundViewModels/response-round-view-model';
import { ResponseUserViewModel } from '../UserViewModels/response-user-view-model';
import { ResponseUserGameViewModel } from '../UserGameViewModels/response-user-game-view-models';

export default class ResponseGameViewModel
{
  constructor(id, users, rounds, isOver, userGames)
  {
    this.id = id;
    this.users = users;
    this.rounds = rounds;
    this.isOver = isOver;
    this.userGames = userGames;
  }

  public id: number;
  public users: Array<ResponseUserViewModel>;
  public rounds: Array<ResponseRoundViewModel>;
  public userGames: Array<ResponseUserGameViewModel>;
  public isOver: boolean;
}
