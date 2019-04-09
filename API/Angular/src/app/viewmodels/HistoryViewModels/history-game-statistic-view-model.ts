import { UserRole } from 'src/app/shared/enums/user-role';
import { UserGameStatus } from 'src/app/shared/enums/user-game-status';

export default class HistoryGameStatisticViewModel {
  constructor(userId, nickname, userRole, rate, status) {
    this.userId = userId;
    this.nickname = nickname;
    this.userRole = userRole;
    this.rate = rate;
    this.status = status;
  }

  public userId: number;
  public nickname: string;
  public userRole: UserRole;
  public rate: number;
  public status: UserGameStatus;
}
