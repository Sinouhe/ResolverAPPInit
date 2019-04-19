import { identifierModuleUrl } from '@angular/compiler';
import { SuperClass } from './modelDeClasse/SuperClass';
import { JsonPipe } from '@angular/common';
import { TypeDepense } from './typeDepense';

export class DepenseParDate extends SuperClass {

    private _sId: string;
    private _dDateCreation: Date;
    private _dDatePayement: Date;
    private _nMois: number;
    private _nAnnee: number;
    private _oTypeDepense: TypeDepense;
    private _sDetail: string;


    constructor(p_sId: string = '',
                p_dDatePayement: Date = new Date(),
                p_nMois: number = 0,
                p_nAnnee: number = 0,
                p_oTypeDepense: TypeDepense = null,
                p_sDateCreation: Date = new Date()) {

        super();
        this._sId = p_sId;
        this._dDatePayement = p_dDatePayement;
        this._nMois = p_nMois;
        this._nAnnee = p_nAnnee;
        this._oTypeDepense = p_oTypeDepense;
        this._dDateCreation = p_sDateCreation;
    }

    public get sId(): string {
        return this._sId;
    }

    public get dDateCreation(): Date {
        return this._dDateCreation;
    }

    public get dDatePayement(): Date {
        return this._dDatePayement;
    }

    public get nMois(): number {
        return this._nMois;
    }

    public get nAnnee(): number {
        return this._nAnnee;
    }

    public get oTypeDepense(): TypeDepense {
        return this._oTypeDepense;
    }

    public get sDetail(): string {
        return this._sDetail;
    }

    public set sId(p_sId) {
        this.sId = p_sId;
    }

    public set dDateCreation(p_dDateCreation: Date) {
        this._dDateCreation = p_dDateCreation;
    }

    public set dDatePayement(p_dDatePayement: Date) {
        this._dDatePayement = p_dDatePayement;
    }

    public set nMois(p_nMois: number) {
        this._nMois = p_nMois;
    }

    public set nAnnee(p_nAnnee: number ) {
        this._nAnnee = p_nAnnee;
    }

    public set oDepenseFixe(p_oTypeDepense: TypeDepense) {
        this._oTypeDepense = p_oTypeDepense;
    }

    public set sDetail(p_sDetail) {
        this._sDetail = p_sDetail;
    }

    toStringVersConsole(): void {
        console.log('typeDepense class log ' + JSON.stringify(this));
    }

}
