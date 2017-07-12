import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import {
  FormsModule, ReactiveFormsModule, FormGroup,
  FormControl
} from '@angular/forms'
import {
  ILeague, IClub, IConfiguration, IIdValueType, IPlayer,
  DataListsService, ConfigurationsService, PlayersService
} from '../shared/index'


@Component({
  selector: 'configuration-edit',
  templateUrl: './configuration-edit.component.html',
  styleUrls: ['./configuration-edit.component.css']
})
export class ConfigurationEditComponent implements OnInit {
  configuration: IConfiguration

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
  controlPlayerList: any[];

  activePlayerList: any[];
  activeNationList: any[];
  activeLeagueList: any[];
  activeClubList: any[];
  activeLevelList: any[]

  isNew: Boolean = true;

  constructor(
    private dataService: DataListsService,
    private configurationService: ConfigurationsService,
    private playersService: PlayersService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.minPrice = new FormControl();
    this.maxPrice = new FormControl();

    this.controlClubsList = new Array();
    this.controlClubsList.push(this.getSelectDefaultItem());

    this.newConfigurationForm = new FormGroup({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });

    this.clubs = null;
  }

  ngOnInit() {

    this.initConfiguration();

    this.activatedRoute.params.subscribe(x => {
      let id = x['id'];
      if (id) {
        this.configurationService.get(id)
          .subscribe(x => {
            this.configuration = x[0];

            if (this.configuration.player) {
              this.playersService.getPlayer(this.configuration.player.id)
                .subscribe(players => {
                  this.mapPlayersList(players, false);
                  let player = players[0];
                  this.activePlayerList = [this.controlPlayerList.find(x => x.id === player.id)];
                });
            }

            if (this.configuration.nation) {
              this.activeNationList = [this.controlNationList.find(x => x.id === this.configuration.nation.id)]
            }

            if (this.configuration.league) {
              this.activeLeagueList = [this.controlLeaguesList.find(x => x.id === this.configuration.league.id)]
              this.populateClubs(this.configuration.league.id);

              if (this.configuration.team) {
                this.activeClubList = [this.controlClubsList.find(x => x.id === this.configuration.team.id)];
              }

              if (this.configuration.level) {
                this.activeLevelList = [this.controlLevelList.find(x => x.text === this.configuration.level)]
              }

              if(this.configuration.minprice){
                this.minPrice.setValue(this.configuration.minprice);;
              }

              if(this.configuration.maxprice){
                this.maxPrice.setValue(this.configuration.maxprice);;
              }
            }

            this.isNew = false;
          });
      }
    });
  }

  save(values) {
    this.configuration.minprice = values.minPrice;
    this.configuration.maxprice = values.maxPrice;

    if (this.isNew) {
      this.configurationService.save(this.configuration)
        .then(() => {
          this.router.navigate(['configurations']);
        })
        .catch(x => console.log(x));
    }
    else {
      this.configurationService.update(this.configuration)
        .then(() => {
          this.router.navigate(['configurations'])
        })
        .catch(x => console.log(x));
    }
  }

  cancel() {
    this.router.navigate(['configurations']);
  }

  onChangeLeague(newLeague) {
    this.configuration.league = this.getIdValue(newLeague);

    if (newLeague.id !== -1) {
      this.populateClubs(newLeague.id);
    }
    else {
      this.clubs = null;
      this.controlClubsList = this.controlClubsList.filter(x => x.id === -1);
    }
  }

  onChangeClub(newClub) {
    this.configuration.team = this.getIdValue(newClub);
  }

  onChangeLevel(newLevel) {
    this.configuration.level = newLevel.text;
  }

  onChangeNation(newNation) {
    this.configuration.nation = this.getIdValue(newNation);
  }

  onChangePlayer(newPlayer) {
    this.configuration.player = this.getIdValue(newPlayer);
    this.activePlayerList = [newPlayer];
  }

  private getIdValue(item): IIdValueType {
    return item.id !== -1 ? { id: item.id, value: item.text } : null;
  }

  filterPlayers(keyword) {
    this.playersService.getPlayersFiltered(keyword)
      .subscribe(items => {
        this.mapPlayersList(items);
      });
  }

  private initConfiguration() {
    this.activePlayerList = [this.getSelectDefaultItem()];
    this.activeNationList = [this.getSelectDefaultItem()];
    this.activeClubList = [this.getSelectDefaultItem()];
    this.activeLeagueList = [this.getSelectDefaultItem()];
    this.activeLevelList = [this.getSelectDefaultItem()];
    this.configuration = {}

    this.playersService.getPlayers()
      .subscribe(data => {
        this.mapPlayersList(data);
      });

    this.dataService.getNations()
      .subscribe(data => {
        this.controlNationList = data.map(x => { return { id: x.id, text: x.value }; });
        this.controlNationList.unshift(this.getSelectDefaultItem());
      });

    this.dataService.getLeagues()
      .subscribe(data => {

        this.leagues = data;
        this.controlLeaguesList = this.leagues.map(x => { return { id: x.id, text: x.name }; });
        this.controlLeaguesList.unshift(this.getSelectDefaultItem());
      });
  }

  private populateClubs(leagueId) {
    let league = this.leagues.find(x => x.id === leagueId);
    this.clubs = league.clubs;

    this.controlClubsList = this.clubs.map(x => { return { id: x.id, text: x.name }; });
    this.controlClubsList.unshift(this.getSelectDefaultItem());
  }

  private mapPlayersList(items: IPlayer[], addDefault = true) {
    this.controlPlayerList = items
      .map(x => { return { id: x.id, text: this.getPlayerSelectItemText(x) } });

    if (addDefault) {
      this.controlPlayerList.unshift(this.getSelectDefaultItem());
    }
  }

  private getSelectDefaultItem() {
    return { id: -1, text: 'All' };
  }

  private getPlayerSelectItemText(player: IPlayer) {
    return (player.firstName + ' ' + player.lastName + ' ' + player.rating).trim();
  }
}
