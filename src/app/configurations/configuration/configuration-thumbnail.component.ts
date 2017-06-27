import { Component, OnInit, Input } from '@angular/core';

import { ISearchConfig } from '../shared/isearch-config.model';


@Component({
  selector: 'configuration-thumbnail',
  templateUrl: './configuration-thumbnail.component.html',
  styleUrls: ['./configuration-thumbnail.component.css']
})

export class ConfigurationThumbnailComponent implements OnInit {
  @Input() config: ISearchConfig;

  constructor() { }

  ngOnInit() {

  }

}
