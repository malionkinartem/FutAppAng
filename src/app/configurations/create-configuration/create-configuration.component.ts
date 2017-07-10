import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {
  FormsModule, ReactiveFormsModule, FormGroup,
  FormControl
} from '@angular/forms'
import {
  ILeague, IClub, IConfiguration, IIdValueType,
  DataListsService, ConfigurationsService
} from '../shared/index'


@Component({
  selector: 'create-configuration',
  templateUrl: './create-configuration.component.html',
  styleUrls: ['./create-configuration.component.css']
})
export class CreateConfigurationComponent implements OnInit {

  newConfigurationForm: FormGroup

  nations: IIdValueType[];
  clubs: IClub[];
  leagues: ILeague[];

  level: FormControl;
  minPrice: FormControl;
  maxPrice: FormControl;

  controlLeaguesList: any[];
  controlClubsList: any[];
  controlLevelList = [
    { id: -1, text: 'All' },
    { id: 1, text: 'Gold' },
    { id: 2, text: 'Silver' },
    { id: 3, text: 'Bronze' }];
  controlNationList: any[];
  controlPlayerList: any[]

  players = [
    { firstName: 'Cristiano', lastName: 'Ronaldo', baseId: 1 },
    { firstName: 'Lionel', lastName: 'Messi', baseId: 2 },
    { firstName: 'Luis', lastName: 'Suarez', baseId: 3 }
  ]

  selectedLeague: ILeague;
  selectedClub: IClub;
  selectedLevel: String;
  selectedNationId: Number;
  selectedPlayerId: Number;

  constructor(
    private dataService: DataListsService,
    private configurationService: ConfigurationsService,
    private router: Router) {

    this.minPrice = new FormControl();
    this.maxPrice = new FormControl();

    this.controlLeaguesList = new Array();
    this.controlLeaguesList.push({ id: -1, text: 'All' });

    this.controlClubsList = new Array();
    this.controlClubsList.push({ id: -1, text: 'All' });

    this.newConfigurationForm = new FormGroup({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });

    this.clubs = null;
  }

  ngOnInit() {

    this.controlPlayerList = this.players.map(x => { return { id: x.baseId, text: (x.firstName + '' + x.lastName).trim() } });
    this.controlPlayerList.unshift({ id: -1, text: 'All' });

    this.dataService.getNations()
      .subscribe(data => {
        this.controlNationList = data.map(x => { return { id: x.id, text: x.value }; });
        this.controlNationList.unshift({ id: -1, text: 'All' });
      });

    this.dataService.getLeagues()
      .subscribe(data => {

        this.leagues = data;
        this.controlLeaguesList = this.controlClubsList.concat(this.leagues.map(x => { return { id: x.id, text: x.name }; }));
      });
  }

  save(values) {
    let newConfiguration: IConfiguration = {
      playerid: this.selectedPlayerId,
      buynowprice: '',
      enabled: true,
      isRare: false,
      league: this.selectedLeague != null ? this.selectedLeague.id : 0,
      level: this.selectedLevel,
      teamid: this.selectedClub != null ? this.selectedClub.id : 0,
      maxprice: values.maxPrice,
      minprice: values.minPrice,
      nationid: this.selectedNationId,
      position: '',
      zone: ''
    };

    this.configurationService.save(newConfiguration)
      .then(() => {
        this.router.navigate(['configurations']);
      })
      .catch(x => console.log(x));
  }

  cancel() {
    this.router.navigate(['configurations']);
  }

  onChangeLeague(newLeague) {
    if (newLeague.id !== -1) {
      this.selectedLeague = this.leagues.find(x => x.id === newLeague.id);
      this.clubs = this.selectedLeague.clubs;

      this.controlClubsList = this.clubs.map(x => { return { id: x.id, text: x.name }; });
      this.controlClubsList.unshift({ id: -1, text: 'All' });
    }
    else {
      this.clubs = null;
      this.controlClubsList = this.controlClubsList.filter(x => x.id === -1);
    }
  }

  onChangeClub(newClub) {
    if (newClub.id !== -1) {
      this.selectedClub = this.clubs.find(x => x.id === newClub.id)
    }
    else {
      this.selectedClub = null;
    }
  }

  onChangeLevel(newLevel) {
    this.selectedLevel = newLevel.text;
  }

  onChangeNation(newNation) {
    this.selectedNationId = newNation.id;
  }

  onChangeplayer(newPlayer) {
    this.selectedPlayerId = newPlayer.id;
  }
}
