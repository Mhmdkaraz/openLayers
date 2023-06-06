import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsTableComponent } from './trips-table/trips-table.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';

const routes: Routes = [
  { path: '', component: TripsTableComponent },
  { path: 'add', component: TripFormComponent },
  { path: 'edit/:tripId', component: TripEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
