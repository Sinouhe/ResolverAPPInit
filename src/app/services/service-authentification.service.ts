import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment.prod';
import { Observable, observable, Subject } from 'rxjs';
import { User } from 'src/class/user';
import { UserDAO } from 'src/class/user_DAO';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceAuthentificationService implements OnInit {

  public _oUser: User;
  public _sToken: string;
  public _oDecodedToken: any;
  public _bIsAuthenticated: boolean;

  private _oSubjectConnectionUserChange: Subject<boolean>;
  private _oSubjectUser: Subject<User>;

  constructor(private _ohttp: HttpClient,
              private _oUserDAO: UserDAO,
              private _oServiceToastMessageService: ServiceToastMessageService) {

    this._sToken = localStorage.getItem(environment.authTokenName);
    this._oSubjectUser = new Subject();
    this._oSubjectConnectionUserChange = new Subject();

  }

  ngOnInit() {
    if (localStorage.getItem(environment.authTokenName)) {
      this.lanceConnectionBdd();
    }
  }

  public get subjectUser(): Observable<User> {
    return this._oSubjectUser;
  }

  public get oSubjectConnectionUserChange(): Observable<boolean> {
    return this._oSubjectConnectionUserChange;
  }

  public user(p_sUser: User) {
    this._oUser = p_sUser;
  }

  public getUser() {
    return this._oUser;
  }

  public get sToken(): string {
    return this._sToken;
  }

  public decodeTokken(): any {
    return this._oDecodedToken;
  }

  public isAuthenticated(): boolean {
    return this._bIsAuthenticated;
  }


  public login(credentials: any): Observable<any> {
    return this._ohttp.post(`${environment.urlBackEnd}/auth/login`, credentials)
                    .pipe(map((res) => {
                      return res;
                    }));
  }

  public deconnectUser() {
    this._bIsAuthenticated = false;
    this._oUser = null;
    this._sToken = '';
    this._oDecodedToken = null;
    localStorage.removeItem(environment.authTokenName);
    // on avertit les autres modules
    this._oSubjectUser.next(this._oUser);
    this._oSubjectConnectionUserChange.next(this._bIsAuthenticated);
  }

  public lanceConnectionToken(p_sToken: any) {
    this._sToken = p_sToken;
    this._oDecodedToken = jwtDecode(this._sToken);
    localStorage.setItem(environment.authTokenName, this._sToken);
    this._oUser = new User(this._oDecodedToken.nom, this._oDecodedToken.prenom, this._oDecodedToken.email);
    this._bIsAuthenticated = true;
    // on avertit les autres modules
    this._oSubjectUser.next(this._oUser);
    this._oSubjectConnectionUserChange.next(this._bIsAuthenticated);
  }


  public lanceConnectionBdd(): Observable<any> {
    this._oDecodedToken = jwtDecode(this._sToken);
    return this._oUserDAO.getUserByEmail(this._oDecodedToken.email);
  }

  public changeUser(p_oUser: User, p_sToken: string): void {
    this._sToken = p_sToken;
    this._oDecodedToken = jwtDecode(this._sToken);
    localStorage.setItem(environment.authTokenName, this._sToken);
    this._oUser = p_oUser;
    // on avertit les autres modules
    this._oSubjectUser.next(this._oUser);
  }

  public getUserID(): string {
    const tokken = this.decodeTokken();
    // console.log('token - ' + JSON.stringify(tokken));
    if (tokken) {
      return tokken.id;
    } else {
      return null;
    }
}

}
