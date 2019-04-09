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
export class HistoryComponent implements OnInit {

  private username: string;
  private isLoad: boolean;
  private response: ResponseGameDetailsViewModel;
  private games: Array<ResponseGamesByUserViewModel>;
  private users: Array<ResponseUserForAutocompleteView>;

  constructor(private service: HistoryService) { }

  GetGameDetails(gameId: number)
  {
    this.service.GetGameDetails(gameId).subscribe((data: ResponseGameDetailsViewModel) =>
    {
      this.response = data;
      console.log(this.response);
      debugger;
    });
  }

  GetGamesByUser()
  {
    let user: ResponseUserForAutocompleteView = this.users.filter(item => item.username == this.username).shift();

    this.service.GetGamesByUser(user.id).subscribe((data: Array<ResponseGamesByUserViewModel>) =>
    {
      this.games = data;
      this.isLoad = true;
    });
  }

  ngOnInit()
  {
    this.service.GetUsersForAutocomplete().subscribe((data: Array<ResponseUserForAutocompleteView>) =>
    {
      this.users = data;
      this.isLoad = false;
    });
  }
}
