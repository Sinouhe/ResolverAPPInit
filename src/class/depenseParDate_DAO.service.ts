import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TypeDepense } from './typeDepense';
import { Observable, Subject } from 'rxjs';
import { DepenseFixeParDate } from './depenseFixeParDate.service';
import { DepenseFixe } from './depenseFixe';
import { DepenseFixeDAO } from './depenseFixe_DAO.service';
import { InterfaceModeleDAO } from './modelDeClasse/modeleDAO';

@Injectable({
    providedIn: 'root'
  })
export class DepenseParDateDAO implements InterfaceModeleDAO {

  constructor(private _http: HttpClient,
              private _oDepenseFixeDAO: DepenseFixeDAO) {
  }

  public createNew(p_sUserId: string, p_nMois: number, p_nAnnee: number): Observable<any> {
    console.log(p_sUserId + ' - ' + p_nMois + ' - ' + p_nAnnee);
    return this._http.post(`${environment.urlBackEnd}${environment.urlBackEndDepenseFixeParDate}createNew`,
                                                          {'_nMois': p_nMois, '_nAnnee': p_nAnnee, 'userId': p_sUserId})
                                                          .pipe(map((res) => {
                                                            return res;
                                                          }));
  }

  public chargeObjetDepuisRetourBackEnd(p_entry: any): DepenseFixeParDate {

    let oDepenseFixeParDate: DepenseFixeParDate;

    let oDepenseFixe: DepenseFixe;
    if (p_entry.odepenseFixe) {
      oDepenseFixe = this._oDepenseFixeDAO.chargeObjetDepuisRetourBackEnd(p_entry.odepenseFixe);
    } else {
      oDepenseFixe = null;
    }
    oDepenseFixeParDate = new DepenseFixeParDate(p_entry._id,
                                                p_entry.bPaye,
                                                p_entry.nMois,
                                                p_entry.nAnnee,
                                                oDepenseFixe);

    return oDepenseFixeParDate;

  }

  public chargelisteParMois(p_sUserId: string, p_nMois: number, p_nAnnee: number): Observable<any> {
    const params = new HttpParams().set('userId', p_sUserId)
                                    .set('_nMois', p_nMois.toString())
                                    .set('_nAnnee', p_nAnnee.toString());
    return this._http.get(`${environment.urlBackEnd}${environment.urlBackEndDepenseFixeParDate}ChargelisteParMois`, { params: params })
                                                          .pipe(map((res) => {
                                                            return res;
                                                          }));
  }
}
