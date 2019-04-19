import { identifierModuleUrl } from '@angular/compiler';
import { SuperClass } from './modelDeClasse/SuperClass';
import { JsonPipe } from '@angular/common';
import { User } from './user';

export class DepenseFixe extends SuperClass {

    private _sNom: string;
    private _sDescription: string;
    private _nMontant: number;
    private _sId: string;
    private _bActif: boolean;
    private _oUser: User;

    constructor(p_sNom: string = '',
                p_sDescription: string = '',
                p_nNomtant: number = 0,
                p_sId: string = '',
                p_bActif: boolean = true) {

        super();
        this._sNom = p_sNom;
        this._sDescription = p_sDescription;
        this._sId = p_sId;
        this._nMontant = p_nNomtant;
        this._bActif = p_bActif;
    }

    public get sDescription(): string {
        return this._sDescription;
    }

    public get sNom(): string {
        return this._sNom;
    }

    public get sId(): string {
        return this._sId;
    }

    public get nMontant(): number {
        return this._nMontant;
    }

    public get bActif(): boolean {
        return this._bActif;
    }

    public get oUser(): User {
        return this._oUser;
    }

    public set oUser(p_oUser: User) {
        this._oUser = p_oUser;
    }

    public set sDescription(p_sDescription) {
        this._sDescription = p_sDescription;
    }

    public set sNom(p_sNom: string) {
        this._sNom = p_sNom;
    }

    public set sId(p_sId: string) {
        this._sId = p_sId;
    }

    public set nMontant(p_nMontant: number) {
        this._nMontant = p_nMontant;
    }

    public set bActif(p_bActif: boolean ) {
        this._bActif = p_bActif;
    }

    toStringVersConsole(): void {
        console.log('typeDepense class log ' + JSON.stringify(this));
    }

}
