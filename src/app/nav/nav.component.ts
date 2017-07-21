import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../user/shared/index'
import { SimpleModalComponent } from '../common/simple-modal/simple-modal.component'

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild(SimpleModalComponent) modal: SimpleModalComponent;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  closeLoginModal(){
    this.modal.closeModal();
  }
}
