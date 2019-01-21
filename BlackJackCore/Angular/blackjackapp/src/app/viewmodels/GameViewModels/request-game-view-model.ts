import { RequestUserViewModel } from '../UserViewModels/request-user-view-model';

export default class RequestGameViewModel
{
  constructor(User, botQuantity, roundQuantity)
  {
    this.User = User;
    this.botQuantity = botQuantity;
    this.roundQuantity = roundQuantity;
  }

  public User: RequestUserViewModel;
  public botQuantity: number;
  public roundQuantity: number;
}
