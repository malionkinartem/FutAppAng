import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import { IUser } from './index'
import { settings } from '../../config'
import { Observable } from 'rxjs'

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  private userApi: string = "/users"

  public create(newuser: IUser): Observable<IUser> {
    return this.http.post(settings.apiUrl + this.userApi, newuser, this.getOptions())
      .map((res: Response) => res.json())
      .map(user => { return user });
  }

  private getOptions() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }
}
