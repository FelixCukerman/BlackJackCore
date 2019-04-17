import { Component, OnInit, Inject } from '@angular/core';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { RequestUserViewModel } from 'src/app/viewmodels/UserViewModels/request-user-view-model';
import { StartService } from 'src/app/services/StartService/start.service';
import { Router } from '@angular/router';
import ResponseGameViewModel from 'src/app/viewmodels/GameViewModels/response-game-view-model';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { GameState } from 'src/app/shared/enums/game-state';

const gameStateKey: string = 'key';
const usernameKey: string = 'username';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit
{
  //#region Fields
  public response: ResponseGameViewModel;
  public request: RequestGameViewModel;
  public user: RequestUserViewModel;

  private _gameState: GameState;
  //#endregion

  constructor(@Inject(LOCAL_STORAGE) private _storage: WebStorageService, private _startService: StartService, private _router: Router) { }

  //#region ngCallbacks
  public ngOnInit(): void
  {
    this.user = new RequestUserViewModel("");
    this.request = new RequestGameViewModel(this.user, 0, 0, 0);
  }
  //#endregion

  //#region Public Methods
  public toHistory(): void
  {
    this._router.navigate(['history']);
  }

  public createNewGame(): void
  {
    this._storage.set(usernameKey, this.user.nickname);

    this._startService.createNewGame(this.request).subscribe((data: ResponseGameViewModel) =>
    {
      this.response = data;
      this._router.navigate(['game/' + data.id]);

      this._gameState = GameState.StartRound;
      this._storage.set(gameStateKey, this._gameState);
    });
  }
  //#endregion
}
