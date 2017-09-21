import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService, UserService } from '../shared/index'
import { Router } from '@angular/router'


@Component({
  selector: 'fut-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.profile = this.fb.group({
      lastname: [this.auth.user.lastname, Validators.required],
      firstname: [this.auth.user.firstname, Validators.required]
    })

  }

  cancel() {
    this.router.navigate(['/']);
  }

  save(values) {
    
    let updatedUser = Object.assign({}, this.auth.user);
    updatedUser.firstname = values.firstname;
    updatedUser.lastname = values.lastname;

    this.userService.update(updatedUser)
      .subscribe(isSuccess => {

        if (isSuccess) {
          this.auth.updateUserData({ firstname: values.firstname, lastname: values.lastname });
        }

        this.router.navigate(['/']);
      })
  }
}
