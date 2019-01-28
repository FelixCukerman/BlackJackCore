import { RequestUserViewModel } from '../UserViewModels/request-user-view-model';

export default class RequestGameViewModel
{
  constructor(User, botQuantity, roundQuantity, userRate)
  {
    this.User = User;
    this.botQuantity = botQuantity;
    this.roundQuantity = roundQuantity;
    this.userRate = userRate;
  }

  public User?: RequestUserViewModel;
  public botQuantity: number;
  public roundQuantity: number;
  public userRate: number;
}
