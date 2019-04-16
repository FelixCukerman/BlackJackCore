import { Component, OnInit, Inject } from '@angular/core';
import ResponseGameViewModel from 'src/app/viewmodels/GameViewModels/response-game-view-model';
import { GameService } from 'src/app/services/GameService/game.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseUserViewModel } from 'src/app/viewmodels/UserViewModels/response-user-view-model';
import { UserRole } from 'src/app/shared/enums/user-role';
import { __await } from 'tslib';
import { ResponseUserRoundViewModel } from 'src/app/viewmodels/UserRoundViewModels/response-user-round-view-model';
import { RequestReplenishCashViewModel } from 'src/app/viewmodels/ReplenishCashViewModels/request-replenish-cash-view-model';
import { GameState } from 'src/app/shared/enums/game-state';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ResponseUserGameViewModel } from 'src/app/viewmodels/UserGameViewModels/response-user-game-view-models';
import { ResponseGameOverViewModel } from 'src/app/viewmodels/GameOverViewModels/response-game-over-view-model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit
{
  public response: ResponseGameViewModel;
  public requestReplenishCash: RequestReplenishCashViewModel;
  public users: Array<ResponseUserViewModel>;
  public bots: Array<ResponseUserViewModel>;
  public person: ResponseUserViewModel;
  public dealer: ResponseUserViewModel;
  public userRounds: Array<ResponseUserRoundViewModel>;
  public userGames: Array<ResponseUserGameViewModel>;
  public responseGameOver: Array<ResponseGameOverViewModel>;
  public winners: Array<ResponseGameOverViewModel>;
  public gameState: GameState;
  public gameIsOver: boolean;
  public gameProcess: string;

  constructor(@Inject(LOCAL_STORAGE) private _storage: WebStorageService, private _service: GameService, private _currentRoute: ActivatedRoute) { }

  public ngOnInit(): void
  {
    this.gameProcess = this._storage.get('gameProcess');
    this.gameState = this._storage.get('key');

    this.requestReplenishCash = new RequestReplenishCashViewModel(0, 0);
    this.bots = new Array<ResponseUserViewModel>();

    this._service.gameById(this._currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) => {
      this.response = data;

      this.initializeUsers();

      if (this.response.isOver && this.gameState == GameState.GameIsOver) {
        this.gameOver();
      }
    });
  }

  private initializeUsers(): void
  {
    this.users = this.response.users.filter(user => user.userRole != UserRole.Dealer);

    this.dealer = this.response.users.filter(user => user.userRole == UserRole.Dealer).shift();
    this.person = this.users.filter(user => user.userRole == UserRole.PeoplePlayer).shift();

    this.userRounds = this.response.rounds[this.response.rounds.length - 1].userRound;

    this.userGames = this.response.userGames;
  }

  public createNewRound(): void
  {
    this._service.createNewRound(this._currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) =>
    {
      this.dealCards();
    });
  }

  public replenishCash(): void
  {
    this.requestReplenishCash.userId = this.person.id;

    this._service.replenishCash(this.requestReplenishCash).subscribe((data: number) => { this.person.cash = data; });
  }

  public dealCardToPlayer(): void
  {
    this.gameProcess = "Your turn";

    this._storage.set('gameProcess', this.gameProcess);

    this._service.dealCardToPlayer(this._currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) =>
    {
      this.response = data;

      this.initializeUsers();
    });
  }

  public dealCardsToBots(): void
  {
    this.gameState = GameState.BotsMove;
    this._storage.set('key', this.gameState);

    this.gameProcess = "Bots draw cards";
    this._storage.set('gameProcess', this.gameProcess);

    let gameId = this._currentRoute.snapshot.params['id'];

    this._service.dealCardsToBots(gameId).subscribe((data: ResponseGameViewModel) =>
    {
      this.response = data;

      this.initializeUsers();

      setTimeout(() => { this.dealCardsToDealer(); }, 4000);
    });
  }

  public gameOver(): void
  {
    this.gameState = GameState.GameIsOver;
    this._storage.set('key', this.gameState);

    this.gameProcess = "Game is over";
    this._storage.set('gameProcess', this.gameProcess);

    this._service.gameOver(this._currentRoute.snapshot.params['id']).subscribe((data: Array<ResponseGameOverViewModel>) =>
    {
      this.responseGameOver = data;

      this.initializeWinners();
    });
  }

  private initializeWinners(): void
  {
    let firstWinner = this.responseGameOver.sort((item1, item2) => item2.winsQuantity - item1.winsQuantity)[0];

    if (firstWinner.winsQuantity != 0)
    {
      this.winners = this.responseGameOver.filter(user => user.winsQuantity == firstWinner.winsQuantity);
    }
  }

  public async dealCardsToDealer(): Promise<void>
  {
    this.gameState = GameState.DealerMove;
    this._storage.set('key', this.gameState);

    this.gameProcess = "Dealer draw cards";
    this._storage.set('gameProcess', this.gameProcess);

    this._service.dealCardsToDealer(this._currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) =>
    {
      this.response = data;

      this.initializeUsers();

      this.gameIsOver = this.response.isOver;

      if (this.gameIsOver)
      {
        setTimeout(() =>
        {
          this.gameOver();
        }, 3000);
      }
    });
  }

  public skipCard(): void
  {
    setTimeout(() =>
    {
      this.dealCardsToBots();
    }, 4000);
  }

  public dealCards(): void
  {
    this.gameProcess = "New round";
    this._storage.set('gameProcess', this.gameProcess);

    this.gameState = GameState.PeopleMove;
    this._storage.set('key', this.gameState);

    this._service.dealCards(this._currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) =>
    {
      this.response = data;

      this.initializeUsers();
    });
  }
}
