import { Routes } from '@angular/router'
import { ConfigurationsComponent } from './configurations/configurations.component'
import { ConfigurationEditComponent }
  from './configurations/configuration/configuration-edit.component'

export const appRoutes: Routes = [
  { path: '', redirectTo: 'configurations', pathMatch: 'full' },
  { path: 'configurations', component: ConfigurationsComponent },
  { path: 'configurations/new', component: ConfigurationEditComponent },
  { path: 'configurations/:id', component: ConfigurationEditComponent },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' }
];
