import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StartService
{
  private url = environment.gameUrl;

  constructor(private http: HttpClient) { }

  public CreateNewGame(request: RequestGameViewModel): Observable<Object>
  {
    let result = this.http.post(this.url + "/create", request);

    return result;
  }
}
