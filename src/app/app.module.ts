import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PopupComponent } from './popup/popup.component';
import { VesselLayerComponent } from './vessel-layer/vessel-layer.component';
import { FormsModule } from '@angular/forms';
import { EventsComponent } from './events/events.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav';
import { EventsDataService } from './events/events-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EventsClient } from './events/events.client';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PortsComponent } from './ports/ports.component';
import { PortsClient } from './ports/ports.client';
import { PortsService } from './ports/ports.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PopupComponent,
    VesselLayerComponent,
    EventsComponent,
    SidenavComponent,
    PortsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    LayoutModule,
  ],
  providers: [EventsDataService, EventsClient, PortsService, PortsClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
