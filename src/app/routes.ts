import { Routes } from '@angular/router'
import { ConfigurationsComponent } from './configurations/configurations.component'
import { ConfigurationEditComponent } from './configurations/configuration/configuration-edit.component'
import { AuthGuard } from './user/shared/index'
import { HomeComponent } from './home/home.component'

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'configurations', component: ConfigurationsComponent, canActivate: [AuthGuard] },
  { path: 'configurations/new', component: ConfigurationEditComponent, canActivate: [AuthGuard] },
  { path: 'configurations/:id', component: ConfigurationEditComponent, canActivate: [AuthGuard] },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] }
];
