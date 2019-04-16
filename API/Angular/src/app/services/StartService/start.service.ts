import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StartService
{
  private url = environment.gameUrl;

  constructor(private _http: HttpClient) { }

  public createNewGame(request: RequestGameViewModel): Observable<Object>
  {
    let result = this._http.post(this.url + "create", request);

    return result;
  }
}
