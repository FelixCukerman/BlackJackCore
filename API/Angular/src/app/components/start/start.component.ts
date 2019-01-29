import { Component, OnInit } from '@angular/core';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { RequestUserViewModel } from 'src/app/viewmodels/UserViewModels/request-user-view-model';
import { StartService } from 'src/app/services/StartService/start.service';
import { Router, Data } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import ResponseGameViewModel from 'src/app/viewmodels/GameViewModels/response-game-view-model';


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

  constructor(private service: StartService, private router: Router, private data: DataService)
  {
  }

  CreateNewGame()
  {
    this.request.User = this.user;
    this.service.CreateNewGame(this.request).subscribe((data: ResponseGameViewModel) => { this.response = data });
    this.data.changeMessage(this.response);
    this.router.navigate(['game/new']);
  }

  ngOnInit()
  {
    this.user = new RequestUserViewModel("");
    this.request = new RequestGameViewModel(this.user, 0, 0, 0);
    this.data.currentMessage.subscribe(message => this.response = message);
  }

}
