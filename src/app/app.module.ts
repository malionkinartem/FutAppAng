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
import { ConfigurationEditComponent } 
       from './configurations/configuration/configuration-edit.component'
import { ConfigurationsService, DataListsService, PlayersService } from './configurations/shared/index'
import { SelectModule } from 'ng2-select'


@NgModule({
  declarations: [
    AppComponent,
    ConfigurationsComponent,
    ConfigurationThumbnailComponent,
    ConfigurationEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    SelectModule
  ],
  providers: [
    ConfigurationsService,
    DataListsService,
    PlayersService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
