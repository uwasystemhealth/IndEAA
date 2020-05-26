import { Injectable } from '@angular/core';
import { Eoc } from './eoc';
import { Competency } from './competency';

@Injectable({
  providedIn: 'root'
})
export class EocService {
  private _eocs: Eoc[];
  private numCompetencies: number;

  eoc (competency: number, subId:number){
    return this._eocs.find(obj => {
      return obj.competency == competency && obj.subId == subId;
    })
  }

  competency (competency: number){
    return new Competency(
      this._eocs.filter(obj => {
        return obj.competency == competency;
      }),
      competency);
  }

  get eocs(){
    return this._eocs;
  }

  get competencies(){
    let ans = [];
    for (var i = 1; i<=this.numCompetencies; ++i){
      ans.push(this.competency(i));
    }
    return ans;
  }

  constructor() {
    this.numCompetencies = 3;
    this._eocs = [];
    const temp = {1:6, 2:4, 3:6};
    for (const competency in temp){
      for (let i = 1; i <= temp[competency]; i++){
        this._eocs.push(new Eoc(Number(competency), i, "Comprehensive, theory based understanding",
         "Comprehensive, theory based understanding of the underpinning natural and physical sciences and the engineering fundamentals applicable to the engineering discipline",
         ["Engages with the engineering discipline", "Identifies and critically apraises"]
        ))
      }
    }
  }
}
