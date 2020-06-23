import { Component, OnInit, Input } from '@angular/core';
import { Eoc } from '../eoc';
import { PortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { Overlay, ConnectedPositionStrategy, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { EocAssessmentOverlayComponent } from '../eoc-assessment-overlay/eoc-assessment-overlay.component';

@Component({
  selector: 'app-eoc-assessment-tile',
  templateUrl: './eoc-assessment-tile.component.html',
  styleUrls: ['./eoc-assessment-tile.component.css']
})
export class EocAssessmentTileComponent implements OnInit {
  @Input()
  eoc: Eoc;
  overlayRef: PortalOutlet;
  constructor(
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    const positioning = this.overlay.position()
      .flexibleConnectedTo(this.getConnectedElement());
    );
    this.overlayRef = this.overlay.create({
      height: '400px',
      width: '500px',
      hasBackdrop: true,
      positionStrategy: positioning
    });
    //const positioning = new ConnectedPositionStrategy();
  }

  showOverlay(){
    console.log("Showing overlay");
    const assessmentOverlay = new ComponentPortal(EocAssessmentOverlayComponent);
    this.overlayRef.attach(assessmentOverlay);    
  }
}
