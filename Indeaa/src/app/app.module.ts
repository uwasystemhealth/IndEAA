import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RLandingComponent } from './r-landing/r-landing.component';
import { RReviewComponent } from './r-review/r-review.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'r-landing'
  },
  {
    path: 'r-landing',
    component: RLandingComponent
  },
  {
    path: 'review/:id',
    component: RReviewComponent
  },
  {
    path: "**",
    redirectTo: "r-landing"
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RLandingComponent,
    RReviewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
