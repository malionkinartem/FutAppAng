import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { ProfileComponent } from './profile/profile.component'
import { RegisterComponent } from './register/register.component'
import { CreateEditComponent } from './agent/create-edit/create-edit.component'
import { AuthGuard } from './index'

export const userRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile/agent/:agentId', component: CreateEditComponent, canActivate: [AuthGuard] },
    { path: 'profile/agent', component: CreateEditComponent, canActivate: [AuthGuard] }
]
