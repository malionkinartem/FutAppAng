import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { settings } from '../../config'
import { IdValueType } from './id-value-type'
import { Observable } from 'rxjs/Observable'

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

  public getClubs(): Observable<IdValueType[]>{
    return this.http.get(settings.apiUrl + '/api/datalists/type/club')
      .map((res: Response) => <IdValueType[]>res.json());
  }

  public getLeagues(): Observable<IdValueType[]>{
    return this.http.get(settings.apiUrl + '/api/datalists/type/league')
      .map((res: Response) => <IdValueType[]>res.json());
  }  
}
