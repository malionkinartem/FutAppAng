import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ConfigurationsService } from './configurations/shared/configurations.service';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { ConfigurationThumbnailComponent } from './configurations/configuration/configuration-thumbnail.component';
import './rxjs-extensions'
import { appRoutes } from './routes'
import { CreateConfigurationComponent } 
       from './configurations/create-configuration/create-configuration.component'


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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ConfigurationsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
