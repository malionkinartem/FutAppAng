import { Component, OnInit } from '@angular/core';
import { DataListsService } from '../shared/data-lists.service'
import { IdValueType } from '../shared/id-value-type'
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { ILeague } from '../shared/league.model'
import { IClub } from '../shared/club.model'

@Component({
  selector: 'create-configuration',
  templateUrl: './create-configuration.component.html',
  styleUrls: ['./create-configuration.component.css']
})
export class CreateConfigurationComponent implements OnInit {

  newConfigurationForm: FormGroup

  nations: IdValueType[];
  clubs: IdValueType[];
  leagues: ILeague[];

  level: FormControl;
  minPrice: FormControl;
  maxPrice: FormControl;

  selectedLeague: ILeague;
  selectedNation: IdValueType;
  selectedClub: IClub;

  constructor(private dataService: DataListsService) {
    // this.newConfigurationForm = new FormGroup({
    //   selectedNation: new FormControl(),
    //   // selectedLeague: new FormControl(),
    //   selectedClub: new FormControl(),
    //   level: new FormControl(),
    //   minPrice: new FormControl(),
    //   maxPrice: new FormControl()
    // });
    this.clubs = null;
    this.selectedLeague = null;
    this.selectedNation = null;
    this.selectedClub = null;
  }

  ngOnInit() {
    this.dataService.getNations()
      .subscribe(data => this.nations = data);

    this.dataService.getLeagues()
      .subscribe(data => this.leagues = data)
  }

  save(values) {
    let a = 0;
  }

  onChangeLeague(newLeague) {
    if (!!newLeague) {
      this.selectedClub = null;
      this.clubs = newLeague.clubs;
    }
    else{
      this.selectedClub = null;
      this.clubs = null;
    }
  }

  onChangeClub(newClub) {
      this.selectedClub = newClub;
  }
}
