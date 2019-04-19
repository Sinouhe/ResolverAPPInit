import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as EmailValidator from 'email-validator';

export class AuthFormVerification {

    private static _sMessageError = '';
    private _emailValidator: FormControl;
    private _passwordValidator: FormControl;

    public static get sMessageError(): string {
        return this._sMessageError;
    }

    public static validateEmailString(p_sEmail: string): boolean {
        if (EmailValidator.validate(p_sEmail)) {
            return true;
        } else {
            this._sMessageError = 'Email non valid';
            return false;
        }
    }

    public static validatePasword(p_sPassword: string): boolean {
        if ( p_sPassword.length < 3  ) {
            this._sMessageError = '4 caractères minimum';
            return false;
        } else if (p_sPassword.length > 30) {
            this._sMessageError = '30 caractères maximum';
            return false;
        } else {
            return true;
        }
    }

    public static memeMotDePasse(p_sPassword1: string, p_sPassword2: string): boolean {
        if (p_sPassword1 !== p_sPassword2) {
            this._sMessageError = 'Les mots de passe ne sont pas identiques';
            return false;
        } else {
            return true;
        }
    }

    public static startVerificationFrom(): void {
        this._sMessageError = '';
    }

    public getEmailValidator(p_sStartValue: string = ''): FormControl {
        this._emailValidator = new FormControl(p_sStartValue, [Validators.required, Validators.email]);
        return this._emailValidator;
    }

    public getPasswordValidator(p_sStartValue: string = ''): FormControl {
        this._passwordValidator = new FormControl(p_sStartValue, [Validators.required,
                                                        Validators.maxLength(30),
                                                        Validators.minLength(4)]);
        return this._passwordValidator;
    }

    public getErrorMessageEmail(): string {
        if (this._emailValidator) {
            return this._emailValidator.hasError('required') ? 'You must enter a value' :
                this._emailValidator.hasError('email') ? 'Email non valid' :
                '';
        }
    }

    public getErrorMessagePassword(): string {
        if (this._passwordValidator) {
            return this._passwordValidator.hasError('required') ? 'You must enter a paswword' :
                this._passwordValidator.hasError('minlength') ? '4 caractères minimum' :
                this._passwordValidator.hasError('maxlength') ? '30 caractères maximum' :
                '';
        }
    }

}
