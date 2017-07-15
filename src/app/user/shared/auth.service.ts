import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { settings } from '../../config'
import { IUser } from './iuser'

@Injectable()
export class AuthService {

  private loggedIn = false;
  private userApi = '/users'
  public user: IUser;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(username, password) {
    return this.http.post(settings.apiUrl + this.userApi + '/login', { username, password }, this.getOptions())
      .map((res: Response) => res.json())
      .map(res => {
        if (res.isSuccess) {
          localStorage.setItem("auth_token", res.token);
          this.loggedIn = true;
          this.user = <IUser>res.user;
        }
      });
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  private getOptions() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }
}
