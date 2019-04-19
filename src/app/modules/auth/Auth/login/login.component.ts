import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthFormVerification } from '../AuthFormVerification';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private formLogin: FormGroup;
  private authFormVerification: AuthFormVerification;
  private hidePassword: boolean;

  constructor(private _formBuilder: FormBuilder,
              private _serviceAuthentificationService: ServiceAuthentificationService,
              private _router: Router,
              private _serviceToastMessageService: ServiceToastMessageService) {
    this.authFormVerification = new AuthFormVerification();
    this.hidePassword = true;
  }

  ngOnInit() {
    this.formLogin = this._formBuilder.group({
      email: this.authFormVerification.getEmailValidator(),
      password: this.authFormVerification.getPasswordValidator()
    });
  }

  public getErrorMessageEmail(): string {
    return this.authFormVerification.getErrorMessageEmail();
  }

  public getErrorMessagePassword(): string {
    return this.authFormVerification.getErrorMessagePassword();
  }

  public changePassVisibility(): void {
    this.hidePassword = ! this.hidePassword;
  }

  public login(loginForm: any): void {
    this._serviceAuthentificationService.login(loginForm.value)
                    .subscribe(
                      (data) => this.handleLoginSuccess(data),
                      (error) =>  this.handleLoginError(error)
                    );
  }

  private handleLoginSuccess(data: any): void {
    if (data.status === 'success') {
      this._serviceAuthentificationService.lanceConnectionToken(data.message);
      this._serviceToastMessageService.afficheMessage(environment.valid, `Connecté.`);
      this._router.navigate(['/account/profil']);
    } else if (data.status === 'error') {
      this._serviceToastMessageService.subject.next({texte: data.message});
      this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
    } else {
      this._serviceToastMessageService.afficheMessage(environment.alert, `Erreur inconnu - ${data.message}`);
    }
  }

  private handleLoginError(data): void { }

}
