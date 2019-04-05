import { Component, OnInit, SimpleChanges, Inject } from '@angular/core';
import ResponseGameViewModel from 'src/app/viewmodels/GameViewModels/response-game-view-model';
import { GameService } from 'src/app/services/GameService/game.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private service: GameService, private router: Router, private currentRoute: ActivatedRoute)
  {
  }

  InitializeUsers()
  {
    this.users = this.response.users.filter(user => user.userRole != UserRole.Dealer);
    this.dealer = this.response.users.filter(user => user.userRole == UserRole.Dealer).shift();
    this.userRounds = this.response.rounds[this.response.rounds.length - 1].userRound;
    this.userGames = this.response.userGames;
    this.person = this.users.filter(user => user.userRole == UserRole.PeoplePlayer).shift();
  }

  CreateNewRound() {
    this.service.CreateNewRound(this.currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) =>

    {
      this.DealCards();
    });
  }

  ReplenishCash() {
    this.requestReplenishCash.userId = this.person.id;
    console.log(1);
    this.service.ReplenishCash(this.requestReplenishCash).subscribe((data: number) => { this.person.cash = data; });
  }

  DealCardToPlayer() {
    this.gameProcess = "Your turn";
    this.storage.set('gameProcess', this.gameProcess);
    this.service.DealCardToPlayer(this.currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) => {
      this.response = data;
      this.InitializeUsers();
    });
  }

  DealCardsToBots() {
    this.gameState = GameState.BotsMove;
    this.storage.set('key', this.gameState);
    this.gameProcess = "Bots draw cards";
    this.storage.set('gameProcess', this.gameProcess);

    let gameId = this.currentRoute.snapshot.params['id'];

    this.service.DealCardsToBots(gameId).subscribe((data: ResponseGameViewModel) => {
      this.response = data;
      this.InitializeUsers();
      setTimeout(() => { this.DealCardsToDealer(); }, 4000);
    });
  }

  GameOver() {
    this.gameState = GameState.GameIsOver;
    this.storage.set('key', this.gameState);
    this.gameProcess = "Game is over";
    this.storage.set('gameProcess', this.gameProcess);

    this.service.GameOver(this.currentRoute.snapshot.params['id']).subscribe((data: Array<ResponseGameOverViewModel>) =>
    {
      this.responseGameOver = data;
      this.InitializeWinners();
    });
  }

  InitializeWinners() {
    let firstWinner = this.responseGameOver.sort((item1, item2) => item2.winsQuantity - item1.winsQuantity)[0];
    if (firstWinner.winsQuantity != 0) {
      this.winners = this.responseGameOver.filter(user => user.winsQuantity == firstWinner.winsQuantity);
    }
  }

  async DealCardsToDealer() {
    this.gameState = GameState.DealerMove;
    this.storage.set('key', this.gameState);
    this.gameProcess = "Dealer draw cards";
    this.storage.set('gameProcess', this.gameProcess);
    this.service.DealCardsToDealer(this.currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) =>
    {
      this.response = data;
      this.InitializeUsers();
      this.gameIsOver = this.response.isOver;
      if (this.gameIsOver) {
        setTimeout(() =>
        {
          this.GameOver();
        }, 3000);
      }
    });
  }

  SkipCard() {
    setTimeout(() => { this.DealCardsToBots(); }, 4000);
  }

  DealCards() {
    this.gameProcess = "New round";
    this.storage.set('gameProcess', this.gameProcess);
    this.gameState = GameState.PeopleMove;
    this.storage.set('key', this.gameState);
    this.service.DealCards(this.currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) => {
      this.response = data;
      this.InitializeUsers();
      console.log(this.response);
    });
  }

  ngOnInit()
  {
    this.gameProcess = this.storage.get('gameProcess');
    this.requestReplenishCash = new RequestReplenishCashViewModel(0, 0);
    this.bots = new Array<ResponseUserViewModel>();
    this.gameState = this.storage.get('key');
    this.service.GameById(this.currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) => {
      this.response = data;
      this.InitializeUsers();
      if (this.response.isOver && this.gameState == GameState.GameIsOver) {
        this.GameOver();
      }
    });
  }
}
