import { Injectable } from '@angular/core';
import { DL } from './dl';

@Injectable({
  providedIn: 'root'
})
export class DLService {
  dls: DL[];
  
  public constructor() { 
    this.dls = [];
    this.dls.push(new DL(1, "Foundational", "Developing a foundation for university level study", 
      {range: "1-3", description: "Remembering, understanding and applying"})
    )
    this.dls.push(new DL(2, "Broad and Coherent", "Sufficient capability to enter the workforce as a non-engineer",
      {range: "3-4", description: "Applying and analysing"},
      {id: 7, description: "Broad and Coherent Knowledge and skills for work and/or further learning (Bachelors)"}));
    this.dls.push(new DL(3, "Advanced", "Sufficient capability for professional practice as a starting engineer",
      {range: "4-6", description: "Analysing, evaluating and creating"},
      {id: 8, description: "Advanced knowledge and skills for professional/highly skilled work and/or further learning (Honours)"}));
    this.dls.push(new DL(4, "Specialist", "Selected areas of strength beyond the requirement for entering professional practice",
      {range: "4-6", description: "Analysing, evaluating and creating"},
      {id: 9, description: "Specialised knowledge and skills for research and/or professional practice and/or further learning (Masters)"}));
  }

  dl(id: number){
    return this.dls.find(obj => {
      obj.id == id;
    })
  }
}
