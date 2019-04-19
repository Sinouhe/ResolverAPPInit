import { Component, OnInit, Input } from '@angular/core';
import { AuthFormVerification } from '../AuthFormVerification';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/class/user';
import { UserDAO } from 'src/class/user_DAO';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';


@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})
export class AccountRegisterComponent implements OnInit {

  @Input() isAuthenticated: boolean;
  private user: User;
  private errorEmail: string;
  private errorPassword: string;
  private errorPasswordConfirm: string;

  constructor(private _UserDAO: UserDAO,
              private _router: Router,
              private _serviceToastMessageService: ServiceToastMessageService) { }

  ngOnInit() { }

  public creationCompte(datafrom: any): void {
    // Validation du formulaire:
   if (this.verficationFormulaireCreationCompte(datafrom) === false) {
     return;
   }
   // enregistre User
   this.saveUser(datafrom);
  }

  public verficationFormulaireCreationCompte(datafrom: any): boolean {
    AuthFormVerification.startVerificationFrom();
    if (AuthFormVerification.validateEmailString(datafrom.email) === false) {
      this.errorEmail = AuthFormVerification.sMessageError;
    } else {
      this.errorEmail = '';
    }
    if (AuthFormVerification.validatePasword(datafrom.password) === false) {
      this.errorPassword = AuthFormVerification.sMessageError;
    } else {
      this.errorPassword = '';
      if (AuthFormVerification.memeMotDePasse(datafrom.password, datafrom.passwordConfirm) === false) {
        this.errorPasswordConfirm = AuthFormVerification.sMessageError;
      } else {
        this.errorPasswordConfirm = '';
      }
    }
    if (AuthFormVerification.sMessageError !== '' ) {
      return false;
    } else {
      return true;
    }
  }

  public saveUser(datafrom: any) {
    this.user = new User(datafrom.nom, datafrom.prenom, datafrom.email, datafrom.password);
    this._UserDAO.enregistreUn(this.user)
                  .subscribe(
                    (data) => {
                      if (data.status === 'success') {
                        this._serviceToastMessageService.afficheMessage(environment.valid, data.message);
                        this._router.navigate(['/account']);
                      } else {
                        this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
                      }
                    },
                    (error) => {
                      this._serviceToastMessageService.afficheMessage(environment.alert, error.message);
                    });
  }

}
