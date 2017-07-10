import { Component, OnInit, Input } from '@angular/core';

import { IConfiguration } from '../shared/index';


@Component({
  selector: 'configuration-thumbnail',
  templateUrl: './configuration-thumbnail.component.html',
  styleUrls: ['./configuration-thumbnail.component.css']
})

export class ConfigurationThumbnailComponent implements OnInit {
  @Input() configuration: IConfiguration;

  constructor() { }

  ngOnInit() {

  }

}
