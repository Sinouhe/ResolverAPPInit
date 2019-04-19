import { identifierModuleUrl } from '@angular/compiler';
import { SuperClass } from './modelDeClasse/SuperClass';
import { JsonPipe } from '@angular/common';
import { DepenseFixe } from './depenseFixe';

export class DepenseFixeParDate extends SuperClass {

    private _sId: string;
    private _bPaye: boolean;
    private _nMois: number;
    private _nAnnee: number;
    private _oDepenseFixe: DepenseFixe;


    constructor(p_sId: string = '',
                p_bPaye: boolean = false,
                p_nMois: number = 0,
                p_nAnnee: number = 0,
                p_oDepenseFixe: DepenseFixe = null) {

        super();
        this._sId = p_sId;
        this._bPaye = p_bPaye;
        this._nMois = p_nMois;
        this._nAnnee = p_nAnnee;
        this._oDepenseFixe = p_oDepenseFixe;
    }

    public get sId(): string {
        return this._sId;
    }

    public get bPaye(): boolean {
        return this._bPaye;
    }

    public get nMois(): number {
        return this._nMois;
    }

    public get nAnnee(): number {
        return this._nAnnee;
    }

    public get oDepenseFixe(): DepenseFixe {
        return this._oDepenseFixe;
    }

    public set sId(p_sId) {
        this.sId = p_sId;
    }

    public set bPaye(p_bPaye: boolean) {
        this._bPaye = p_bPaye;
    }

    public set nMois(p_nMois: number) {
        this._nMois = p_nMois;
    }

    public set nAnnee(p_nAnnee: number ) {
        this._nAnnee = p_nAnnee;
    }

    public set oDepenseFixe(p_oDepenseFixe: DepenseFixe) {
        this._oDepenseFixe = p_oDepenseFixe;
    }

    toStringVersConsole(): void {
        console.log('typeDepense class log ' + JSON.stringify(this));
    }

}
