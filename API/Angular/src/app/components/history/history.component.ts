import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/HistoryService/history.service';
import HistoryGameByUser from 'src/app/viewmodels/HistoryViewModels/history-game-by-user';
import RequestRoundHistoryViewModel from 'src/app/viewmodels/HistoryViewModels/request-round-history-view-model';
import HistoryUserRoundViewModel from 'src/app/viewmodels/HistoryViewModels/history-user-round-view-model';
import ResponseUserForAutocompleteView from 'src/app/viewmodels/HistoryViewModels/response-user-for-autocomplete-view';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  private username: string;
  private roundResponse: Array<HistoryUserRoundViewModel>;
  private gameResponse: Array<Array<HistoryUserRoundViewModel>>
  private games: Array<HistoryGameByUser>;
  private users: Array<ResponseUserForAutocompleteView>;

  constructor(private service: HistoryService) { }

  private GetGameHistory(game: HistoryGameByUser)
  {
    for (let i = 0; i < game.roundsIds.length; i++)
    {
      let request: RequestRoundHistoryViewModel = new RequestRoundHistoryViewModel(game.roundsIds[i], game.gameId);

      this.service.GetHistoryUserRounds(request).subscribe((data: Array<HistoryUserRoundViewModel>) => {
        this.roundResponse = data;
        this.gameResponse.push({ ...this.roundResponse });
      });
    }
  }

  public GetGamesByUser()
  {
    let person = this.users.filter(user => user.username == this.username).shift();

    this.service.GetAllGameIdsByUser(person.id).subscribe((data: Array<HistoryGameByUser>) => {
      this.games = data;
      console.log(this.games);
    });
  }

  ngOnInit()
  {
    this.service.GetUsersForAutocomplete().subscribe((data: Array<ResponseUserForAutocompleteView>) =>
    {
      this.users = data;
    });
  }
}
