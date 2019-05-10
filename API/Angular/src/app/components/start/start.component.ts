import { Component, OnInit, Inject } from '@angular/core';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { RequestUserViewModel } from 'src/app/viewmodels/UserViewModels/request-user-view-model';
import { StartService } from 'src/app/services/StartService/start.service';
import { Router } from '@angular/router';
import ResponseGameViewModel from 'src/app/viewmodels/GameViewModels/response-game-view-model';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { GameState } from 'src/app/shared/enums/game-state';
import ResponseUserForAutocompleteViewItem from 'src/app/viewmodels/userViewModels/response-user-for-autocomplete-view-item';
import { AccountService } from 'src/app/services/AccountService/account-service.service';

//#region Constants
const gameStateKey: string = 'key';
const usernameKey: string = 'username';
const historyPage: string = 'history';
//#endregion

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
  public users: Array<ResponseUserForAutocompleteViewItem>;

  private _gameState: GameState;
  //#endregion

  constructor(@Inject(LOCAL_STORAGE) private _storage: WebStorageService, private _startService: StartService, private _router: Router, private _accountService: AccountService) { }

  public ngOnInit(): void
  {
    this.getUsersForAutocomplete();
    this.user = new RequestUserViewModel("");
    this.request = new RequestGameViewModel(this.user, 0, 0, 0);
  }

  //#region Public Methods
  public toHistory(): void
  {
    console.log(this.user);
    this._router.navigate([historyPage]);
  }

  public createNewGame(): void
  {
    let existingUser: ResponseUserForAutocompleteViewItem = this.getExistingUser();

    if (!existingUser)
    {
      this._accountService.createUser(this.user.nickname);
      return;
    }

    this._storage.set(usernameKey, this.user.nickname);

    this._startService.createNewGame(this.request).subscribe((data: ResponseGameViewModel) =>
    {
      this.response = data;
      this._router.navigate(['game/' + data.id]);

      this._gameState = GameState.StartRound;
      this._storage.set(gameStateKey, this._gameState);
    });
  }

  public getUsersForAutocomplete(): void
  {
    this._startService.getUsersForAutocomplete().subscribe((data: Array<ResponseUserForAutocompleteViewItem>) =>
    {
      this.users = data;
    });
  }

  public getExistingUser(): ResponseUserForAutocompleteViewItem
  {
    let existingUser: ResponseUserForAutocompleteViewItem = this.users.filter(item => item.username == this.user.nickname).shift();

    return existingUser;
  }
  //#endregion
}
