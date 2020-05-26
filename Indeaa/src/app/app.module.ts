//Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material imports
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule, MatCard } from '@angular/material/card';

//Own component imports
import { AppComponent } from './app.component';
import { RLandingComponent } from './r-landing/r-landing.component';
import { RReviewComponent } from './r-review/r-review.component';
import { RReviewAComponent } from './r-review-a/r-review-a.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RReviewBComponent } from './r-review-b/r-review-b.component';
import { RReviewCComponent } from './r-review-c/r-review-c.component';
import { RReviewDComponent } from './r-review-d/r-review-d.component';
import { CompetencyDisplayComponent } from './competency-display/competency-display.component';
import { EocDisplayComponent } from './eoc-display/eoc-display.component';
import { DlDisplayComponent } from './dl-display/dl-display.component';

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
    path: 'r-review/:id',
    component: RReviewComponent,
  },
  {
    path: "*",
    redirectTo: "r-landing"
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RLandingComponent,
    RReviewComponent,
    RReviewAComponent,
    PageNotFoundComponent,
    RReviewBComponent,
    RReviewCComponent,
    RReviewDComponent,
    CompetencyDisplayComponent,
    EocDisplayComponent,
    DlDisplayComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatStepperModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
