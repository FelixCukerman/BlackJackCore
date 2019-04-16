import { Component, OnInit, Inject } from '@angular/core';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { RequestUserViewModel } from 'src/app/viewmodels/UserViewModels/request-user-view-model';
import { StartService } from 'src/app/services/StartService/start.service';
import { Router } from '@angular/router';
import ResponseGameViewModel from 'src/app/viewmodels/GameViewModels/response-game-view-model';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { GameState } from 'src/app/shared/enums/game-state';
import { AccountService } from 'src/app/services/AccountService/account-service.service';

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
  private tokenIsExist: boolean;

  constructor(@Inject(LOCAL_STORAGE) private _storage: WebStorageService, private _startService: StartService, private _router: Router, private _authService: AccountService) { }

  ngOnInit(): void
  {
    this.user = new RequestUserViewModel("");
    this.request = new RequestGameViewModel(this.user, 0, 0, 0);
    this.tokenIsExist = false;
  }

  toHistory(): void
  {
    this._router.navigate(['history']);
  }

  createNewGame(): void
  {
    this._storage.set('username', this.user.Nickname);

    this.tokenIsExist = this.checkTokenExist();

    if (!this.tokenIsExist)
    {
      return;
    }

    this._startService.createNewGame(this.request).subscribe((data: ResponseGameViewModel) =>
    {
      this.response = data;
      this._router.navigate(['game/' + data.id]);

      this.gameState = GameState.StartRound;
      this._storage.set('key', this.gameState);
    });
  }

  checkTokenExist(): boolean
  {
    let token: string = this._authService.getToken();
    let tokenIsMissing: boolean = token == null;

    if (tokenIsMissing)
    {
      this._authService.createToken(this.user.Nickname);
    }

    return tokenIsMissing;
  }
}
