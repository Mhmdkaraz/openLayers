import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map, Overlay, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { PopupComponent } from './popup/popup.component';
import { Vessel } from 'src/shared/vessel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
