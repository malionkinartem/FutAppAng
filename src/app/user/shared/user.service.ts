import { Injectable } from '@angular/core';
import { IUser } from './index'
import { settings } from '../../config'
import { Observable } from 'rxjs/observable'
import { JsonHttpService, IResponse, INoDataResponse } from '../../shared/index'

@Injectable()
export class UserService {

  private userApi = '/users';

  constructor(private jsonHttp: JsonHttpService) { }

  public create(newuser: IUser): Observable<IUser> {
    return this.jsonHttp.post(settings.apiUrl + this.userApi, newuser)
      .map((response: IResponse<IUser>) => response.data);
  }

  public update(user: IUser): Observable<boolean> {
    return this.jsonHttp.put(this.getUrl(this.userApi), user)
      .map((response: INoDataResponse) => response.isSuccess);
  }

  private getUrl(relativeUrl) {
    return settings.apiUrl + relativeUrl;
  }
}
