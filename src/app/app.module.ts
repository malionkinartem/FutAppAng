import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { ConfigurationThumbnailComponent } from './configurations/configuration/configuration-thumbnail.component';
import './rxjs-extensions'
import { appRoutes } from './routes'
import { CreateConfigurationComponent } 
       from './configurations/create-configuration/create-configuration.component'
import { ConfigurationsService, DataListsService } from './configurations/shared/index'


@NgModule({
  declarations: [
    AppComponent,
    ConfigurationsComponent,
    ConfigurationThumbnailComponent,
    CreateConfigurationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    ConfigurationsService,
    DataListsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
