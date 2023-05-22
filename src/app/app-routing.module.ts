import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { MapComponent } from './map/map.component';
import { PortsComponent } from './ports/ports.component';

const routes: Routes = [
  {
    path: 'vessels',
    loadChildren: () =>
      import('./vessels/vessels.module').then((m) => m.VesselsModule),
  },
  { path: 'maps', component: MapComponent },
  { path: 'events', component: EventsComponent },
  { path: 'ports', component: PortsComponent },
  { path: '', redirectTo: '/maps', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
