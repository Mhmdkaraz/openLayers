import { Port } from 'src/shared/port.model';
import { Component, Input, OnInit } from '@angular/core';
import { Map, Overlay } from 'ol';
@Component({
  selector: 'app-port-popup',
  templateUrl: './port-popup.component.html',
  styleUrls: ['./port-popup.component.css'],
})
export class PortPopupComponent implements OnInit {
  @Input() map: Map;
  @Input() selectedPort: Port;
  portOverlay: Overlay;
  ngOnInit(): void {
    this.portOverlay = new Overlay({
      element: document.getElementById('port-popup'),
      autoPan: true,
    });
    this.map.addOverlay(this.portOverlay);
    const closer = document.getElementById('port-popup-closer');
    closer.onclick = () => {
      this.portOverlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  }
}