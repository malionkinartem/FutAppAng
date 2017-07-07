import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { settings } from '../../config'
import { IIdValueType, IClub, ILeague } from './index'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class DataListsService {

  private baseApiUrl: string;

  constructor(private http: Http) { 

  }

  public getNations(): Observable<IIdValueType[]>{
    return this.http.get(settings.apiUrl + '/datalists/type/nation')
      .map((res: Response) => 
      {
        var nations = <IIdValueType[]>res.json()

        return nations.sort((x, y) => x.value > y.value ? 1 : -1);
      });
  }

  public getLeagues(): Observable<ILeague[]>{
    return this.http.get(settings.apiUrl + '/leagues')
      .map((res: Response) => <ILeague[]>res.json());
  }  
}
