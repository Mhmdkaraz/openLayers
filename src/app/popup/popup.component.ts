import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Map, Overlay } from 'ol';
import { Vessel } from 'src/shared/vessel.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  @Input() map: Map;
  @Input() selectedVessel: Vessel;
  overlay: Overlay;
  ngOnInit(): void {
    this.overlay = new Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
    });
    this.map.addOverlay(this.overlay);
    const closer = document.getElementById('popup-closer');
    closer.onclick = () => {
      this.overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  }
}
