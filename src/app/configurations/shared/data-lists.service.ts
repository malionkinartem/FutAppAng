import { Injectable } from '@angular/core';
import { settings } from '../../config'
import { IIdValueType, IClub, ILeague } from './index'
import { Observable } from 'rxjs/Observable'
import { JsonHttpService, IResponse } from '../../shared/index'

@Injectable()
export class DataListsService {

  private baseApiUrl: string;

  constructor(private jsonHttp: JsonHttpService) {

  }

  public getNations(): Observable<IIdValueType[]> {
    return this.jsonHttp.get(settings.apiUrl + '/datalists/type/nation')
      .map((res: IResponse<IIdValueType[]>) => {
        const nations = res.data

        return nations.sort((x, y) => x.value > y.value ? 1 : -1);
      });
  }

  public getLeagues(): Observable<ILeague[]> {
    return this.jsonHttp.get(settings.apiUrl + '/leagues')
      .map((res: IResponse<ILeague[]>) => res.data);
  }
}
