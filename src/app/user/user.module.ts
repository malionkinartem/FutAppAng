import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { userRoutes } from './routes';
import { ProfileComponent } from './profile/profile.component'
import { AgentListComponent, CreateEditComponent, AuthService, UserService } from './index';
import { RegisterComponent } from './register/register.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(userRoutes)
  ],
  providers: [
    AuthService,
    UserService
  ],
  declarations: [
    ProfileComponent,
    AgentListComponent,
    CreateEditComponent,
    RegisterComponent
  ]
})

export class UserModule { }
