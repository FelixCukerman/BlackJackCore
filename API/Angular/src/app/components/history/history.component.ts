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

  ngOnInit()
  {
    this.service.GetUsersForAutocomplete().subscribe((data: Array<ResponseUserForAutocompleteView>) =>
    {
      this.users = data;
    });
  }
}
