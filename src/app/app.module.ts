import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module'
import {
  ConfigurationsComponent, ConfigurationThumbnailComponent, ConfigurationEditComponent,
  ConfigurationsService, DataListsService, PlayersService
} from './configurations/index';
import './rxjs-extensions'
import { appRoutes } from './routes'
import { SelectModule } from 'ng2-select';
import { NavComponent } from './nav/nav.component';
import { AuthService, AuthGuard } from './user/shared/index';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './common/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationsComponent,
    ConfigurationThumbnailComponent,
    ConfigurationEditComponent,
    NavComponent,
    HomeComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    SelectModule,
    SharedModule
  ],
  providers: [
    ConfigurationsService,
    DataListsService,
    PlayersService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
