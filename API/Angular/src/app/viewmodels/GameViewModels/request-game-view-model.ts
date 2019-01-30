import { RequestUserViewModel } from '../UserViewModels/request-user-view-model';

export default class RequestGameViewModel
{
  constructor(user, botQuantity, roundQuantity, userRate)
  {
    this.user = user;
    this.botQuantity = botQuantity;
    this.roundQuantity = roundQuantity;
    this.userRate = userRate;
  }

  public user?: RequestUserViewModel;
  public botQuantity: number;
  public roundQuantity: number;
  public userRate: number;
}
