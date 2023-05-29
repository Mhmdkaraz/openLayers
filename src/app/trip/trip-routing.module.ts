import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsTableComponent } from './trips-table/trips-table.component';
import { TripFormComponent } from './trip-form/trip-form.component';

const routes: Routes = [
  { path: '', component: TripsTableComponent },
  { path: 'add', component: TripFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
