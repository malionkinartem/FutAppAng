import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { AuthService } from '../shared/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Output() onLoggedIn = new EventEmitter();
  @Output() onCanceled = new EventEmitter();

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
    if (!this.authService.isLoggedIn()) {
      this.authService.login(values.username, values.password)
        .subscribe(x => {
          if (this.authService.isLoggedIn()) {
            this.onLoggedIn.emit();
          }
          else {
            this.validationMessage = "User name or password is invalid."
          }
        });
    }
  }

  cancel() {
    this.onCanceled.emit();
  }
}
