import { Component, OnInit, Inject } from '@angular/core';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { RequestUserViewModel } from 'src/app/viewmodels/UserViewModels/request-user-view-model';
import { StartService } from 'src/app/services/StartService/start.service';
import { Router, Data } from '@angular/router';
import ResponseGameViewModel from 'src/app/viewmodels/GameViewModels/response-game-view-model';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { GameState } from 'src/app/shared/enums/game-state';
import { AccountService } from 'src/app/services/AccountService/account-service.service';
import { GetTokenViewModel } from 'src/app/viewmodels/AccountViewModels/get-token-view-model';
import { debug } from 'util';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit
{
  public response: ResponseGameViewModel;
  public request: RequestGameViewModel;
  public user: RequestUserViewModel;
  private gameState: GameState;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private startService: StartService, private router: Router)
  {
  }

  CreateNewGame()
  {
    this.storage.set('username', this.user.Nickname);

    this.startService.CreateNewGame(this.request).subscribe((data: ResponseGameViewModel) => {
      this.response = data;
      this.router.navigate(['game/' + data.id]);
      this.gameState = GameState.StartRound;
      this.storage.set('key', this.gameState);
    });
  }

  ngOnInit()
  {
    this.user = new RequestUserViewModel("");
    this.request = new RequestGameViewModel(this.user, 0, 0, 0);
  }
}
