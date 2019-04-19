import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';
import { Observable } from 'rxjs';
import { DAOinterface } from './modelDeClasse/DAOinterface';

@Injectable({
    providedIn: 'root'
  })
export class UserDAO {

  constructor(private _http: HttpClient) { }

  public enregistreUn(p_oUser: User): Observable<any> {
      return this._http.post(`${environment.urlBackEnd}/auth/saveUser`, p_oUser)
                  .pipe(map((res) => {
                    return res;
                  }));
  }

  public getUserByEmail(p_sEmail: string): Observable<any> {
    return this._http.post(`${environment.urlBackEnd}/auth/getUserByEmail`, {'email': p_sEmail})
                  .pipe(map((res) => {
                    return res;
                  }));
    // return this._http.post(`${environment.urlBackEnd}/auth/getUserByEmail`, {'email': p_sEmail});
  }

  public modifieUn(p_oUser: User): Observable<any> {
    return this._http.post(`${environment.urlBackEnd}/auth/changeUserByEmail`, p_oUser)
                      .pipe(map((res: any) => {
                        return res;
                      }));
  }

  public chargeObjetDepuisRetourBackEnd(p_object: any): User {
    const oUser: User = new User( p_object.nom,
                                  p_object.prenom,
                                  p_object.email,
                                  p_object._id);
    return oUser;

  }

}
