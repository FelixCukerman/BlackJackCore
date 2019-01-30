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
    console.log("game by id " + id);
    return this.http.get(this.url + "/gamebyid/" + id);
  }
}
