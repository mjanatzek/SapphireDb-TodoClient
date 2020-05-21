import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SAPPHIRE_DB_OPTIONS, SapphireDbModule} from 'ng-sapphiredb';
import {SapphireDbOptions} from 'sapphiredb';
import {NgMetro4Module} from 'ng-metro4';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMetro4Module,
    SapphireDbModule
  ],
  providers: [
    {
      provide: SAPPHIRE_DB_OPTIONS,
      useValue: {
        connectionType: 'websocket',
        useSsl: true,
        serverBaseUrl: 'sapphiredb-todo.azurewebsites.net',
        offlineSupport: true,
        offlineOptimization: true
      } as SapphireDbOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
