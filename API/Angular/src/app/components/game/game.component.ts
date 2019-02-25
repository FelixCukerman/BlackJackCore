import { Component, OnInit, SimpleChanges, Inject } from '@angular/core';
import ResponseGameViewModel from 'src/app/viewmodels/GameViewModels/response-game-view-model';
import { GameService } from 'src/app/services/GameService/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseUserViewModel } from 'src/app/viewmodels/UserViewModels/response-user-view-model';
import { UserRole } from 'src/app/shared/enums/user-role';
import { ResponseCardViewModel } from 'src/app/viewmodels/CardViewModels/response-card-view-model';
import { __await } from 'tslib';
import { ResponseUserRoundViewModel } from 'src/app/viewmodels/UserRoundViewModels/response-user-round-view-model';
import { RequestReplenishCashViewModel } from 'src/app/viewmodels/ReplenishCashViewModels/request-replenish-cash-view-model';
import { GameState } from 'src/app/shared/enums/game-state';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { RequestDealCardsToBotViewModel } from 'src/app/viewmodels/DealCardsToBotViewModel/request-deal-cards-to-bot-view-model';
import { ResponseUserGameViewModel } from 'src/app/viewmodels/UserGameViewModels/response-user-game-view-models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit
{
  public response: ResponseGameViewModel;
  public requestReplenishCash: RequestReplenishCashViewModel;
  public requestDealCardsToBot: RequestDealCardsToBotViewModel;
  public users: Array<ResponseUserViewModel>;
  public peopleplayer: ResponseUserViewModel;
  public dealer: ResponseUserViewModel;
  public userRounds: Array<ResponseUserRoundViewModel>;
  public userGames: Array<ResponseUserGameViewModel>;
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
    this.peopleplayer = this.users.filter(user => user.userRole == UserRole.PeoplePlayer).shift();
  }

  CreateNewRound() {
    this.service.CreateNewRound(this.currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) =>
    {
      this.DealCards();
    });
  }

  ReplenishCash() {
    this.requestReplenishCash.gameId = this.currentRoute.snapshot.params['id'];
    this.service.ReplenishCash(this.requestReplenishCash).subscribe((data: number) => { this.peopleplayer.cash = data; });
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
    let bots = this.response.users.filter(user => user.userRole == UserRole.BotPlayer);

    for (let i = 0; i < bots.length; i++) {
      this.requestDealCardsToBot.gameId = this.currentRoute.snapshot.params['id'];
      this.requestDealCardsToBot.userId = bots[i].id;
      this.service.DealCardsToBots(this.requestDealCardsToBot).subscribe((data: ResponseGameViewModel) =>
      {
        this.response = data;
        this.InitializeUsers();
      });
    }
  }

  DealCardsToDealer() {
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
          this.gameState = GameState.GameIsOver;
          this.storage.set('key', this.gameState);
          this.gameProcess = "Game is over";
          this.storage.set('gameProcess', this.gameProcess);
        }, 2000);
      }
    });
  }

  SkipCard() {
    setTimeout(() => { this.DealCardsToBots(); }, 4000);
    setTimeout(() => { this.DealCardsToDealer(); }, 8000);
  }

  DealCards() {
    this.gameProcess = "New round";
    this.storage.set('gameProcess', this.gameProcess);
    this.gameState = GameState.PeopleMove;
    this.storage.set('key', this.gameState);
    this.service.DealCards(this.currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) => {
      this.response = data;
      this.InitializeUsers();
    });
  }

  ngOnInit()
  {
    this.gameProcess = this.storage.get('gameProcess');
    this.requestReplenishCash = new RequestReplenishCashViewModel(0, 0);
    this.requestDealCardsToBot = new RequestDealCardsToBotViewModel(0, 0);
    this.gameState = this.storage.get('key');
    this.service.GameById(this.currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) => {
      this.response = data;
      this.InitializeUsers();
      console.log(this.response);
    });
  }
}
