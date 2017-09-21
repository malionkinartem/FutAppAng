import { Injectable } from '@angular/core';
import { settings } from '../../config'
import { Observable } from 'rxjs/Observable'
import { IPlayer } from './index'
import { JsonHttpService, IResponse } from '../../shared/index'

@Injectable()
export class PlayersService {

  url = '/players';

  constructor(private jsonHttp: JsonHttpService) { }

  getPlayers(): Observable<IPlayer[]> {
    return this.jsonHttp.get(settings.apiUrl + this.url)
    .map((response: IResponse<IPlayer[]>) => response.data);
  }

  getPlayersFiltered(filter): Observable<IPlayer[]> {
    return this.jsonHttp.get(settings.apiUrl + this.url + '/name/' + filter)
    .map((response: IResponse<IPlayer[]>) => response.data);
  }

  getPlayer(id): Observable<IPlayer[]> {
    return this.jsonHttp.get(settings.apiUrl + this.url + '/' + id)
      .map((response: IResponse<IPlayer[]>) => response.data);
  }
}
