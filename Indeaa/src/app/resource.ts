export class Resource {
    title: string;
    uploaded: Date;
    description: string;
    //TODO: Complete this to allow an actual document to be downloadeds

    constructor(title: string, uploaded: Date, description: string){
        this.title = title;
        this.uploaded = uploaded;
        this.description = description;
    }
}
