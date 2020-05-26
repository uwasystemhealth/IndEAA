import { Component, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Indeaa';
  onActivate(event){
    //alert(JSON.stringify(event));
    /*TODO
    console.log(`onActivate`);
    console.log(event);
    console.log(event.review);
    console.log(Object.getOwnPropertyNames(event));
    console.log(event.route);
    console.log(event.review);
    console.log(typeof event);*/
  }
}

