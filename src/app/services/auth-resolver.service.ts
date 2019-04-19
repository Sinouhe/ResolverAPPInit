import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable()
export class AuthResolverService implements Resolve<any> {

  constructor(private _serviceAuthentificationService: ServiceAuthentificationService) { }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> | String {
    if (localStorage.getItem(environment.authTokenName) && this._serviceAuthentificationService._bIsAuthenticated === true) {
      return this._serviceAuthentificationService.lanceConnectionBdd();
    } else {
      return null;
    }
  }

}
