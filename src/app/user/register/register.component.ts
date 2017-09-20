import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {
  FormsModule, ReactiveFormsModule, FormGroup,
  FormControl, Validators
} from '@angular/forms'
import { UserService, IUser, AuthService } from '../index'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newuser: FormGroup

  constructor(private router: Router, private userService: UserService, private auth: AuthService) {
    this.newuser = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeatpassword: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }

  public save(values) {
    let newuser: IUser = {
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.email,
      password: values.password
    }

    this.userService.create(newuser)
      .subscribe((user: IUser) => {
        if (user !== undefined) {
          debugger;
          this.auth.login(user.username, newuser.password).subscribe(success => {
            debugger
            if(success){
              this.router.navigate(['/']);
            }
          });
        }
      });
  }

  public cancel(data) {
    debugger;
    this.router.navigate(['/']);
  }
}
