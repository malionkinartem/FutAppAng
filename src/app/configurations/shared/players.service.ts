import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http'
import { settings } from '../../config'
import { Observable } from 'rxjs/Observable'
import { IPlayer } from './index'

@Injectable()
export class PlayersService {

  url = '/players';

  constructor(private http: Http) { }

  getPlayers() : Observable<IPlayer[]>{
    return this.http.get(settings.apiUrl + this.url)
      .map((res: Response) => res.json());
  }

  getPlayersFiltered(filter) : Observable<IPlayer[]>{
    return this.http.get(settings.apiUrl + this.url + '/name/' + filter)
      .map((res: Response) => res.json());
  }

  getPlayer(id) : Observable<IPlayer[]>{
    return this.http.get(settings.apiUrl + this.url + '/' + id)
      .map(res => res.json())
  }
}
