import { Injectable } from '@angular/core';
import { Resource } from './resource';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  public resources: Resource[];
  
  constructor() { 
    this.resources = [];
    this.resources.push(new Resource("MECH5521 Outline", 
      new Date(2020, 2, 16),
      "Outlines the content of the MECH5521 course"));
    this.resources.push(new Resource("Design Project Outline Outline", 
      new Date(2020, 2, 15),
      "Specifies the scope of the desing project including expectations around proactivity"));
    this.resources.push(new Resource("Example of Mech Design Project", 
      new Date(2020, 2, 15),
      "A submitted mechanical design project which reflects an approximately average level of achievement"));
    this.resources.push(new Resource("RITO Project - J slack tool", 
      new Date(2020, 2, 15),
      "Outline received from sponsoring engineering firm"));
  }
}
