import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import ResponseGameViewModel from 'src/app/viewmodels/GameViewModels/response-game-view-model';
import { GameService } from 'src/app/services/GameService/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseUserViewModel } from 'src/app/viewmodels/UserViewModels/response-user-view-model';
import { UserRole } from 'src/app/shared/enums/user-role';
import { ResponseCardViewModel } from 'src/app/viewmodels/CardViewModels/response-card-view-model';
import { __await } from 'tslib';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit
{
  public response: ResponseGameViewModel;
  public users: Array<ResponseUserViewModel>;
  public dealer: ResponseUserViewModel;
  public isLoad: boolean;

  constructor(private service: GameService, private router: Router, private currentRoute: ActivatedRoute)
  {
  }
  InitializeUsers()
  {
    this.users = this.response.users.filter(user => user.userRole != UserRole.Dealer);
    this.dealer = this.response.users.filter(user => user.userRole == UserRole.Dealer).shift();
  }

  Show() {
    console.log(this.dealer.cards);
  }

  ngOnInit()
  {
    this.isLoad = false;
    this.service.GameById(this.currentRoute.snapshot.params['id']).subscribe((data: ResponseGameViewModel) => {
      this.response = data;
      this.service.DealCards(this.currentRoute.snapshot.params['id']).subscribe((newdata: ResponseGameViewModel) => {
        this.response = newdata;
        this.InitializeUsers();
        this.isLoad = true;
      });
    });
  }
}
