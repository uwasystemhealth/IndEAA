export class Eoc {
    competency: number;
    subId: number;
    title: string;
    description: string;
    ioas: string[];

    constructor(competency: number, subId: number, title: string, description: string, ioas: string[]){
        this.competency = competency;
        this.subId = subId;
        this.title = title;
        this.description = description;
        this.ioas = ioas;
    }

    id(){
        return `${this.competency}.${this.subId}`;
    }
}