import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VesselsRoutingModule } from './vessels-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { VesselsTableComponent } from './vessels-table/vessels-table.component';
import { VesselsFormComponent } from './vessels-form/vessels-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
@NgModule({
  declarations: [
    VesselsTableComponent,
    VesselsFormComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    VesselsRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [MatDialog, MatSnackBar],
})
export class VesselsModule {}
