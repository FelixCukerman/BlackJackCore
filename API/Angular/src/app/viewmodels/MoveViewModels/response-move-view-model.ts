import { ResponseUserViewModel } from '../UserViewModels/response-user-view-model';
import { ResponseCardViewModel } from '../CardViewModels/response-card-view-model';

export default class ResponseMoveViewModel {
  constructor(User, Card) {
    this.Card = Card;
    this.User = User;
  }

  public User: ResponseUserViewModel;
  public Card: ResponseCardViewModel;
}
