import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IConfiguration } from '../shared/index';


@Component({
  selector: 'fut-configuration-thumbnail',
  templateUrl: './configuration-thumbnail.component.html',
  styleUrls: ['./configuration-thumbnail.component.css']
})

export class ConfigurationThumbnailComponent implements OnInit {
  @Input() configuration: IConfiguration;
  @Output() delete =  new EventEmitter()

  constructor() { }

  ngOnInit() {

  }

  onDelete(event) {
    this.delete.emit();
    event.stopPropagation();
  }
}
