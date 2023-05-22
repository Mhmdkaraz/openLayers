import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VesselsTableComponent } from './vessels-table/vessels-table.component';
import { VesselsFormComponent } from './vessels-form/vessels-form.component';

const routes: Routes = [
  { path: '', component: VesselsTableComponent },
  { path: 'add', component: VesselsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VesselsRoutingModule {}
