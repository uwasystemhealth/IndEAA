import { ReviewState } from './review-state.enum';
import { ReviewService } from './review.service';

export class Review {
    id: number;
    name: string;
    due: Date;
    state: ReviewState;
    
    constructor(id: number, name:string, due:Date, state:ReviewState){
        this.id = id;
        this.name = name;
        this.due = due;
        this.state = state;
    }
}