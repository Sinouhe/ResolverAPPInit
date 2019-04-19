import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Car } from './Car';
import { Observable } from 'rxjs';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';

@Injectable({
  providedIn: 'root'
})
export class GarageResolverService implements Resolve<Car[]> {

  constructor(private _serviceAuthentificationService: ServiceAuthentificationService) { }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> | Car[] {
    return this._serviceAuthentificationService.lanceConnectionBdd();
    /*const cars: Car[] = [{
      name: 'fusion',
      color: 'blue'
    }];
    let a = 1;
    // simulation d'un delais de réponse
    for (let i = 1  ; i < 9000000000 ; i++) {
        a = a + 1;
    }

    const observable: Observable<Car[]> = Observable.create(observer => {
      observer.next(cars);
      observer.complete();
    });
    // return cars;
    return observable;
    */
   }

}
