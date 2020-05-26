import { Eoc } from './eoc';

export class Competency {
    eocs: Eoc[];
    num: number;

    constructor(eocs: Eoc[], num: number){
        this.eocs = eocs;
        this.num = num;
    }
}
