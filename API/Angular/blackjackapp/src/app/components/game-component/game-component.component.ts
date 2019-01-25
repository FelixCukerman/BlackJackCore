import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/GameService/game-service.service';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { RequestUserViewModel } from 'src/app/viewmodels/UserViewModels/request-user-view-model';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.css']
})
export class GameComponent implements OnInit
{
  public request: RequestGameViewModel;
  public user: RequestUserViewModel;

  constructor(private service: GameService)
  {
  }

  CreateNewGame()
  {
    this.request.User = this.user;
    this.service.CreateNewGame(this.request).subscribe();
  }

  ngOnInit()
  {
    this.user = new RequestUserViewModel("");
    this.request = new RequestGameViewModel(this.user, 0, 0);
  }

}
