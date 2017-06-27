import { Component, OnInit } from '@angular/core';
import { ISearchConfig } from '../configurations/shared/isearch-config.model';
import { ConfigurationsService } from '../configurations/shared/configurations.service';



@Component({
  selector: 'search-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {
  configurations: ISearchConfig[];

  constructor(private configService: ConfigurationsService) { }

  ngOnInit() {
    this.configService.getConfigurations().subscribe(json => {

      this.configurations = json;
    })
  }

}
