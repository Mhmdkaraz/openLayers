import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: 'maps', component: MapComponent },
  { path: 'events', component: EventsComponent },
  { path: '', redirectTo: '/maps', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
