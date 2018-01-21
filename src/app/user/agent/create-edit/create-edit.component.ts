import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../../shared/user.service'
import { AuthService } from '../../shared/auth.service'
import { SelectComponent } from 'ng2-select';

@Component({
  selector: 'fut-create-edit-agent',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})

export class CreateEditComponent implements OnInit {

  @Input() id: number
  @ViewChild(SelectComponent) select: SelectComponent

  consoleTypes = [
    { id: 1, text: 'ps4' },
    { id: 2, text: 'xbox' }
  ]

  agentFormGroup: FormGroup

  isNewAgent: boolean = true
  agentId: string
  validationMessage: string
  isValidation: boolean

  consoleTypesActive: any[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService) {

    this.agentFormGroup = this.fb.group({
      agentusername: new FormControl('', Validators.required),
      agentpassword: new FormControl('', Validators.required),
      agentrepeatpassword: new FormControl('', Validators.required),
      consoleTypesDdl: new FormControl(this.consoleTypesActive, Validators.required)
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['agentId']) {
        this.agentId = params['agentId'];
        this.isNewAgent = !this.agentId

        let agent = this.auth.user.agents.find(x => x.agentname === this.agentId);
        this.consoleTypesActive = [this.consoleTypes.find(x => x.text === agent.platform)];

        this.agentFormGroup.patchValue({
          agentusername: agent.agentname,
          agentpassword: agent.password,
          agentrepeatpassword: agent.password,
          consoleTypesDdl: this.consoleTypesActive
        });
      }
      else {
        this.consoleTypesActive = [this.consoleTypes[0]];
        this.agentFormGroup.controls['consoleTypesDdl'].setValue(this.consoleTypesActive);
      }
    });
  }

  cancel() {
    this.router.navigate(['user', 'profile']);
  }

  save(data) {
    this.validationMessage = "";
    this.isValidation = false;

    let agentData = {
      agentname: data.agentusername,
      password: data.agentpassword,
      platform: this.consoleTypesActive[0].text
    }

    if (this.isNewAgent) {
      if (this.auth.user.agents === undefined) {
        this.auth.user.agents = []; 
      }
      
      let existAgents = this.auth.user.agents.filter(x=>x.agentname === agentData.agentname);
      if(!!existAgents.length){
        this.isValidation = true;
        this.validationMessage = "Agent with the same user name already exist."
        return;
      }

      this.auth.user.agents.push(agentData);    
    }
    else{
      let agent = this.auth.user.agents.find(x=>x.agentname == this.agentId);
      agent = agentData;
    }

    this.userService.update(this.auth.user).subscribe(x => {
      console.log('user agent added');
      this.auth.updateUser();
      this.router.navigate(['user', 'profile']);
    });

  }

  onChangeConsoleType(newConsoleType) {
    this.consoleTypesActive = [this.consoleTypes.find(x => x.id === newConsoleType.id)];
  }
}