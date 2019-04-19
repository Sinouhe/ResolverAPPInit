import { InterfaceSuperClass } from './InterfaceSuperClass';

export abstract class SuperClass implements InterfaceSuperClass {

    private idendifiantUniqueInterne: string;

    constructor() {
        this.idendifiantUniqueInterne = this.IDGenerator();
    }

    abstract toStringVersConsole();


    private IDGenerator() {

        const _getRandomInt = function( min, max ) {
            return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
        };
        const timestamp: number = +new Date;
        const ts: string = timestamp.toString();
        const parts = ts.split( '' ).reverse();
        let id = '';

        for ( let i = 0; i < 8; ++i ) {
            const index = _getRandomInt( 0, parts.length - 1 );
            id += parts[index];
        }

        return id;

    }


}
