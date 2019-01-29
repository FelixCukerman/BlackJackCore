import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ResponseGameViewModel from '../viewmodels/GameViewModels/response-game-view-model';

@Injectable({
  providedIn: 'root'
})
export class DataService
{
  private messageSource = new BehaviorSubject<ResponseGameViewModel>(new ResponseGameViewModel(null, null, false));
  currentMessage = this.messageSource.asObservable();
  constructor()
  {
  }

  changeMessage(message: ResponseGameViewModel)
  {
    this.messageSource.next(message);
  }
}
