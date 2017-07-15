import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/shared/index'

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
