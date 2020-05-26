export class DL {
    id: number;
    title: string;
    description: string;
    bloom: {range: string, description: string};
    aqf?: {id: number, description: string};
    
    constructor(id: number, title: string, description: string, bloom: {range: string, description: string}, aqf?: {id: number, description: string}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.bloom = bloom;
        this.aqf = aqf;
    }
}
