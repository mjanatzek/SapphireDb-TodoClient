import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SAPPHIRE_DB_OPTIONS, SapphireDbModule} from 'ng-sapphiredb';
import {SapphireDbOptions} from 'sapphiredb';
import {NgMetro4Module} from 'ng-metro4';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMetro4Module,
    SapphireDbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: SAPPHIRE_DB_OPTIONS,
      useValue: {
        connectionType: 'websocket',
        // useSsl: true,
        // serverBaseUrl: 'sapphiredb-todo.azurewebsites.net'
        serverBaseUrl: 'localhost:5000',
        useSsl: false
      } as SapphireDbOptions
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
