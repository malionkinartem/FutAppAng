import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { AuthService } from '../shared/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  validationMessage: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {

    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  login(values) {
    this.authService.login(values.username, values.password)
      .subscribe(x => {
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/']);
        }
        else {
          this.validationMessage = "User name or password is invalid."
        }
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
