export class User {

    private _sNom: string;
    private _sPrenom: string;
    private _sEmail: string;
    private _sPassword: string;

    constructor(p_sNom: string = '', p_sPrenom: string = '', p_sEmail: string = '', p_sPassword?: string) {
        this._sNom = p_sNom;
        this._sPrenom = p_sPrenom;
        this._sEmail = p_sEmail;
        this._sPassword = p_sPassword;
    }

    public get email(): string {
        return this._sEmail;
    }

    public get nom(): string {
        return this._sNom;
    }

    public get prenom(): string {
        return this._sPrenom;
    }

    public get password(): string {
        return this._sPassword;
    }

    public set prenom(p_sPrenom) {
        this._sPrenom = p_sPrenom;
    }

    public set nom(p_sNom) {
        this._sNom = p_sNom;
    }

    public set email(p_sEmail) {
        this._sEmail = p_sEmail;
    }

}
