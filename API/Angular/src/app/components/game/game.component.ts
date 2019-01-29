import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import ResponseGameViewModel from 'src/app/viewmodels/GameViewModels/response-game-view-model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit
{
  message: ResponseGameViewModel;
  constructor(private data: DataService)
  {
  }

  ngOnInit()
  {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
  }

}
