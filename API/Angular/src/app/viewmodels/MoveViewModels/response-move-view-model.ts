import { ResponseUserViewModel } from '../UserViewModels/response-user-view-model';
import { ResponseCardViewModel } from '../CardViewModels/response-card-view-model';

export default class ResponseMoveViewModel {
  constructor(user, card) {
    this.card = card;
    this.user = user;
  }

  public user: ResponseUserViewModel;
  public card: ResponseCardViewModel;
}
