import { Routes } from '@angular/router'
import { ConfigurationsComponent } from './configurations/configurations.component'
import { CreateConfigurationComponent } 
      from './configurations/create-configuration/create-configuration.component'

export const appRoutes: Routes = [
  { path: '', redirectTo: 'configurations', pathMatch: 'full' },
  { path: 'configurations', component: ConfigurationsComponent },
  { path: 'configurations/new', component: CreateConfigurationComponent }
];
