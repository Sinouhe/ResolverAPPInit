import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TypeDepense } from './typeDepense';
import { Observable, Subject } from 'rxjs';
import { InterfaceModeleDAO } from './modelDeClasse/modeleDAO';

@Injectable({
    providedIn: 'root'
  })
export class TypeDepenseDAO implements InterfaceModeleDAO {

  // private _subject: Subject<TypeDepense>;

  constructor(private _http: HttpClient) {
    // this._subject = new Subject();
  }

  /*
  public get subject(): Subject<TypeDepense> {
    return this._subject;
  }
  */

  public enregistreUn(p_sUserId: string, p_oTypeDepense: TypeDepense): Observable<any> {
      return this._http.post(`${environment.urlBackEnd}${environment.urlBackEndTypeDpense}addOne`,
                                                          {'typeDepense': p_oTypeDepense, 'userId': p_sUserId})
                                                          .pipe(map((res) => {
                                                            return res;
                                                          }));
  }

  public modifieUn(p_sUserId: string, p_oTypeDepense: TypeDepense): Observable<any> {
    return this._http.post(`${environment.urlBackEnd}${environment.urlBackEndTypeDpense}modifyOne`,
                                                          {'typeDepense': p_oTypeDepense, 'userId': p_sUserId})
                                                              .pipe(map((res) => {
                                                                return res;
                                                              }));
  }

  public chargeTous(p_sUserId: string): Observable<any> {
    const params = new HttpParams().set('userId', p_sUserId);
    return this._http.get(`${environment.urlBackEnd}${environment.urlBackEndTypeDpense}all`, { params: params })
                                                          .pipe(map((res) => {
                                                            return res;
                                                          }));
  }

  public chargeObjetDepuisRetourBackEnd(p_object: any): TypeDepense {
    const oTypeDepense: TypeDepense = new TypeDepense(p_object.sNom, p_object.sDescription, p_object._id);
    return oTypeDepense;

  }

}
