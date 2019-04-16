import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/HistoryService/history.service';
import ResponseUserForAutocompleteView from 'src/app/viewmodels/HistoryViewModels/response-user-for-autocomplete-view';
import ResponseGamesByUserViewModel from 'src/app/viewmodels/HistoryViewModels/response-games-by-user-view-model';
import ResponseGameDetailsViewModel from 'src/app/viewmodels/HistoryViewModels/response-game-details-view-model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit
{
  public username: string;
  public response: Array<ResponseGameDetailsViewModel>;
  public games: Array<ResponseGamesByUserViewModel>;
  public users: Array<ResponseUserForAutocompleteView>;

  constructor(private _service: HistoryService)
  {
    this.response = new Array<ResponseGameDetailsViewModel>();
  }

  //#region ngCallbacks
  public ngOnInit(): void
  {
    this._service.getUsersForAutocomplete().subscribe((data: Array<ResponseUserForAutocompleteView>) =>
    {
      this.users = data;
    });
  }
  //#endregion

  //#region Public Methods
  public getGameDetails(gameId: number): void
  {
    this._service.getGameDetails(gameId).subscribe((data: ResponseGameDetailsViewModel) =>
    {
      this.response.push({ ...data });
    });
  }

  public getGamesByUser(): void
  {
    let user: ResponseUserForAutocompleteView = this.users.filter(item => item.username == this.username).shift();

    this._service.getGamesByUser(user.id).subscribe((data: Array<ResponseGamesByUserViewModel>) =>
    {
      this.games = data;

      for (let i = 0; i < this.games.length; i++)
      {
        this.getGameDetails(this.games[i].gameId);
      }
    });
  }
  //#endregion
}
