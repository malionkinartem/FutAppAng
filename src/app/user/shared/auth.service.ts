import { Injectable, OnInit } from '@angular/core';
import { settings } from '../../config'
import { IUser } from './iuser'
import { Router } from '@angular/router'
import { JsonHttpService } from '../../shared/json-http.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthService implements OnInit {

  private userApi = '/users'
  public user: IUser;

  ngOnInit(): void {

  }

  constructor(private router: Router, private jsonHttp: JsonHttpService) {
    const userItem = localStorage.getItem('user_data');

    if (!!userItem) {
      this.user = JSON.parse(userItem);      
    }
  }

  login(username, password) {
    return this.jsonHttp.post(settings.apiUrl + this.userApi + '/login', { username, password })
      .map(res => {
        if (res.isSuccess) {
          localStorage.setItem('user_data', JSON.stringify(res.data));
          this.user = <IUser>res.data;
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

  updateUserData(updatedUser) {
    this.user.firstname = updatedUser.firstname;
    this.user.lastname = updatedUser.lastname;
    
    localStorage.setItem('user_data', JSON.stringify(this.user));
  }
}
