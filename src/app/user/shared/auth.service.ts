import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { settings } from '../../config'
import { IUser } from './iuser'
import { Router } from '@angular/router'

@Injectable()
export class AuthService implements OnInit {

  private userApi = '/users'
  public user: IUser;

  ngOnInit(): void {

  }

  constructor(private http: Http, private router: Router) {
    const userItem = localStorage.getItem('user_data');

    if (!!userItem) {
      this.user = JSON.parse(userItem);
    }
  }

  login(username, password) {
    return this.http.post(settings.apiUrl + this.userApi + '/login', { username, password }, this.getOptions())
      .map((res: Response) => res.json())
      .map(res => {
        if (res.isSuccess) {
          localStorage.setItem('user_data', JSON.stringify(res.user));
          this.user = <IUser>res.user;
        }

        return res.isSuccess;
      });
  }

  isLoggedIn() {
    return !!this.user;
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user_data');
    this.router.navigate(['home']);
  }

  private getOptions() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }
}
