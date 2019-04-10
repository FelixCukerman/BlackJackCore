import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/HistoryService/history.service';
import ResponseUserForAutocompleteView from 'src/app/viewmodels/HistoryViewModels/response-user-for-autocomplete-view';
import ResponseGamesByUserViewModel from 'src/app/viewmodels/HistoryViewModels/response-games-by-user-view-model';
import ResponseGameDetailsViewModel from 'src/app/viewmodels/HistoryViewModels/response-game-details-view-model';
import { log } from 'util';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  private username: string;
  private response: Array<ResponseGameDetailsViewModel>;
  private games: Array<ResponseGamesByUserViewModel>;
  private users: Array<ResponseUserForAutocompleteView>;

  constructor(private service: HistoryService)
  {
    this.response = new Array<ResponseGameDetailsViewModel>();
  }

  GetGameDetails(gameId: number)
  {
    this.service.GetGameDetails(gameId).subscribe((data: ResponseGameDetailsViewModel) =>
    {
      this.response.push({ ...data });
    });
  }

  GetGamesByUser()
  {
    let user: ResponseUserForAutocompleteView = this.users.filter(item => item.username == this.username).shift();

    this.service.GetGamesByUser(user.id).subscribe((data: Array<ResponseGamesByUserViewModel>) =>
    {
      this.games = data;
      for (let i = 0; i < this.games.length; i++)
      {
        this.GetGameDetails(this.games[i].gameId);
      }
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
