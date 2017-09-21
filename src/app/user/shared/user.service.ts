import { Injectable } from '@angular/core';
import { IUser } from './index'
import { settings } from '../../config'
import { Observable } from 'rxjs'
import { JsonHttpService, IResponse } from '../../shared/index'

@Injectable()
export class UserService {

  constructor(private jsonHttp: JsonHttpService) { }

  private userApi: string = "/users";

  public create(newuser: IUser): Observable<IUser> {
    return this.jsonHttp.post(settings.apiUrl + this.userApi, newuser)
      .map((response: IResponse<IUser>) => { return response.data; });
  }
}
