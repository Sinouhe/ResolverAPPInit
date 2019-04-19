import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { NavMenuPrincipalComponent } from './nav-menu-principal/nav-menu-principal.component';
import { RoutesCompteWebAppModule } from './router/mainFirstRouter/routes-compte-web-app.module';
import { PageNotFoundComponent } from './router/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastAlertComponent } from './outils/toast-alert/toast-alert.component';
import { HttpClientModule } from '@angular/common/http';
import { GarageComponent } from './testResolver/garage/garage.component';

import { AppInitService } from './app-init.service';

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  };
}


@NgModule({
  declarations: [
    AppComponent,
    NavMenuPrincipalComponent,
    PageNotFoundComponent,
    ToastAlertComponent,
    GarageComponent
  ],
  imports: [
    BrowserModule,
    RoutesCompteWebAppModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [AppInitService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
