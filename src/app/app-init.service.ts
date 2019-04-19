import { Injectable } from '@angular/core';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/class/user';

@Injectable()
export class AppInitService {

    constructor(private _serviceAuthentificationService: ServiceAuthentificationService) {
    }

    Init() {

        return new Promise<void>((resolve, reject) => {
            console.log('AppInitService.init() called');
            if (localStorage.getItem(environment.authTokenName) /*&& this._serviceAuthentificationService._bIsAuthenticated === true*/) {
                return this._serviceAuthentificationService.lanceConnectionBdd().toPromise().then(data => {
                    let oUser: User;
                    oUser = new User(data.result.nom, data.result.prenom, data.result.email);
                    this._serviceAuthentificationService._oUser = oUser;
                    this._serviceAuthentificationService._bIsAuthenticated = true;
                    console.log('AppInitService Finished');
                    resolve();
                });
            } else {
                console.log('AppInitService Finished');
                resolve();
            }
        });
    }
}
