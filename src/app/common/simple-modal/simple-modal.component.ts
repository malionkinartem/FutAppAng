import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core'
import * as $ from 'jquery'


@Component({
  selector: 'fut-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css']
})

export class SimpleModalComponent implements OnInit {
  @Input() title: string
  @Input() elementId: string
  @ViewChild('modalcontainer') containerEl: ElementRef
  @Input() closeOnBodyClick: string

  constructor() { }

  ngOnInit() {

  }

  closeModal() {
    if (this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
      $(this.containerEl.nativeElement).hide();
    }
  }
}


