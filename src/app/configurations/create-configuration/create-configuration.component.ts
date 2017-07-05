import { Component, OnInit } from '@angular/core';
import { DataListsService } from '../shared/data-lists.service'
import { IdValueType } from '../shared/id-value-type'
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
 
@Component({
  selector: 'create-configuration',
  templateUrl: './create-configuration.component.html',
  styleUrls: ['./create-configuration.component.css']
})
export class CreateConfigurationComponent implements OnInit {

  newConfigurationForm: FormGroup

  nations: IdValueType[];
  clubs: IdValueType[];
  leagues: IdValueType[];

  selectedNation: FormControl;
  selectedLeague: FormControl;
  selectedClub: FormControl;
  level: FormControl;
  minPrice: FormControl;
  maxPrice: FormControl;

  constructor(private dataService: DataListsService) {
    this.newConfigurationForm = new FormGroup({
      selectedNation: new FormControl(),
      selectedLeague: new FormControl(),
      selectedClub: new FormControl(),
      level: new FormControl(),
      minPrice: new FormControl(),
      maxPrice: new FormControl()
    });
  }

  ngOnInit() {
    this.dataService.getNations()
      .subscribe(data => this.nations = data);
    
    this.dataService.getClubs()
      .subscribe(data => this.clubs = data)

    this.dataService.getLeagues()
      .subscribe(data => this.leagues = data)
  }

  save(values){
    let a = 0;
  }
}
