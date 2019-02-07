import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService
{
  private url = "/api/game";
  constructor(private http: HttpClient) { }

  public GameById(id: number)
  {
    return this.http.get(this.url + "/gamebyid/" + id);
  }

  public DealCards(id: number)
  {
    return this.http.post(this.url + "/dealcards/" + id, id);
  }
}
