import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { IAgent } from 'app/user/shared/iagent';
import { AuthService, UserService } from '../../shared/index'

@Component({
  selector: 'fut-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {

  @Input() agents: IAgent[]

  constructor(private auth: AuthService, private userSerice: UserService) { }

  ngOnInit() {
  }

  deleteAgent(id) {
    this.auth.user.agents = this.auth.user.agents.filter(x => x.agentname !== id);
    this.userSerice.update(this.auth.user).subscribe(x=>{
      this.auth.updateUser();
    });
  }
}
