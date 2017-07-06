import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { settings } from '../../config'
import { IdValueType } from './id-value-type'
import { Observable } from 'rxjs/Observable'
import { IClub } from './club.model'
import { ILeague } from './league.model'

@Injectable()
export class DataListsService {

  private baseApiUrl: string;

  constructor(private http: Http) { 

  }

  public getNations(): Observable<IdValueType[]>{
    return this.http.get(settings.apiUrl + '/api/datalists/type/nation')
      .map((res: Response) => 
      {
        var nations = <IdValueType[]>res.json()

        return nations.sort((x, y) => x.value > y.value ? 1 : -1);
      });
  }

  public getLeagues(): Observable<ILeague[]>{
    return this.http.get(settings.apiUrl + '/api/leagues')
      .map((res: Response) => <ILeague[]>res.json());
  }  
}
