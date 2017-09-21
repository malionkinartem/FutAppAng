import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'fut-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.profile = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required]
    })
  }

  cancel() {

  }

  save(values) {

  }
}
