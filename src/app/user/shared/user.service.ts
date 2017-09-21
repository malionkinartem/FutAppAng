import { Injectable } from '@angular/core';
import { IUser } from './index'
import { settings } from '../../config'
import { Observable } from 'rxjs/observable'
import { JsonHttpService, IResponse } from '../../shared/index'

@Injectable()
export class UserService {

  private userApi = '/users';

  constructor(private jsonHttp: JsonHttpService) { }

  public create(newuser: IUser): Observable<IUser> {
    return this.jsonHttp.post(settings.apiUrl + this.userApi, newuser)
      .map((response: IResponse<IUser>) => response.data );
  }
}
