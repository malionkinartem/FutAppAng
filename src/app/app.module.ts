import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  ConfigurationsComponent, ConfigurationThumbnailComponent, ConfigurationEditComponent,
  ConfigurationsService, DataListsService, PlayersService
} from './configurations/index';
import './rxjs-extensions'
import { appRoutes } from './routes'
import { SelectModule } from 'ng2-select';
import { NavComponent } from './nav/nav.component';
import { AuthService, AuthGuard } from './user/shared/index';
import { LoginComponent } from './user/login/login.component'
import { SimpleModalComponent, ModalTriggerDirective } from './common/index';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationsComponent,
    ConfigurationThumbnailComponent,
    ConfigurationEditComponent,
    NavComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    LoginComponent,
    HomeComponent
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
    PlayersService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
