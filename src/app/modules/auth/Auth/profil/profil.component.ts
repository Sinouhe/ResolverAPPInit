import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthFormVerification } from '../AuthFormVerification';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/class/user';
import { UserDAO } from 'src/class/user_DAO';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  private _oUser: User;
  private _bPanelOpenState: boolean;
  private _bProfilChange: boolean;
  private _oFormProfil: FormGroup;
  private _oAuthFormVerification: AuthFormVerification;

  constructor(private _serviceAuthentificationService: ServiceAuthentificationService,
              private _serviceToastMessageService: ServiceToastMessageService,
              private _formBuilder: FormBuilder,
              private _User_DAO: UserDAO) {

    this._oUser = this._serviceAuthentificationService.getUser();
    this._oAuthFormVerification = new AuthFormVerification();
    this._serviceAuthentificationService.subjectUser
                                        .subscribe(
                                          (data) => {
                                            this._oUser = data;
                                            console.log(this._oUser);
                                          },
                                          (error) => {
                                            this._serviceToastMessageService.afficheMessage(environment.alert,
                                                                                            error.message);
                                          });
  }

  ngOnInit() {
    console.log(this._oUser);
    console.log(this._serviceAuthentificationService._oUser);
    this._bPanelOpenState = false;
    this._bProfilChange = false;

    this._oFormProfil = this._formBuilder.group({
      email: this._oAuthFormVerification.getEmailValidator(),
      prenom: '',
      nom: ''
    });

  }

  public get bPanelOpenState(): boolean {
    return this._bPanelOpenState;
  }

  public get bprofilChane(): boolean {
    return this._bProfilChange;
  }

  public setSaveProfil(p_oFormValue): void {
    if (p_oFormValue.email === '' && p_oFormValue.nom === '' && p_oFormValue.prenom === '') {
      this._bProfilChange = false;
    } else if (  (p_oFormValue.email !== this._oUser.email && p_oFormValue.email !== '')
                || (p_oFormValue.nom !== this._oUser.nom && p_oFormValue.nom !== '')
                || (p_oFormValue.prenom !== this._oUser.prenom && p_oFormValue.prenom !== '')) {
      this._bProfilChange = true;
    } else {
      this._bProfilChange = false;
    }
  }

  public modifieProfil(p_oForm: any): void {
    // j'enregistre les modifications du profil utilisateur
    const oUserPourModification = new User();
    if (p_oForm.value.prenom === '') {
      oUserPourModification.prenom = this._oUser.prenom;
    } else {
      oUserPourModification.prenom = p_oForm.value.prenom;
    }
    if (p_oForm.value.nom === '') {
      oUserPourModification.nom = this._oUser.nom;
    } else {
      oUserPourModification.nom = p_oForm.value.nom;
    }
    oUserPourModification.email = this._oUser.email;
    // on enregistre
    this._User_DAO.modifieUn(oUserPourModification).subscribe(
                                              (data) => {
                                                if (data.status === 'success') {
                                                  this._serviceAuthentificationService.changeUser(oUserPourModification, data.result);
                                                  this._serviceToastMessageService.afficheMessage(environment.valid, data.message);
                                                } else {
                                                  this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
                                                }
                                              },
                                              (error) => {
                                                this._serviceToastMessageService.afficheMessage(environment.alert, error.message);
                                              });
  }

}
