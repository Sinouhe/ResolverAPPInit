import { identifierModuleUrl } from '@angular/compiler';
import { SuperClass } from './modelDeClasse/SuperClass';
import { JsonPipe } from '@angular/common';

export class TypeDepense extends SuperClass {

    private _sNom: string;
    private _sDescription: string;
    private _sId: string;

    constructor(p_sNom: string = '', p_sDescription: string = '', p_sId: string = '') {
        super();
        this._sNom = p_sNom;
        this._sDescription = p_sDescription;
        this._sId = p_sId;
    }

    public get sDescription(): string {
        return this._sDescription;
    }

    public get sNom(): string {
        return this._sNom;
    }

    public get id(): string {
        return this._sId;
    }

    public set sDescription(p_sDescription) {
        this._sDescription = p_sDescription;
    }

    public set sNom(p_sNom) {
        this._sNom = p_sNom;
    }

    public set id(p_sId: string) {
        this._sId = p_sId;
    }

    toStringVersConsole(): void {
        console.log('typeDepense class log ' + JSON.stringify(this));
    }

}
