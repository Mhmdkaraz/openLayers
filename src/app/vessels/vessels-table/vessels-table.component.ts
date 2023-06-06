import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VesselsService } from '../vessels.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { EditVesselFormComponent } from '../edit-vessel-form/edit-vessel-form.component';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels-table.component.html',
  styleUrls: ['./vessels-table.component.css'],
})
export class VesselsTableComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'IMO_NUMBER',
    'VESSEL_NAME',
    'COUNTRY',
    'LATITUDE',
    'LONGITUDE',
    'TIMEOFPOSITION',
    'SPEED',
    'Actions',
  ];
  constructor(
    private vesselsService: VesselsService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }
  ngOnInit(): void {
    this.vesselsService.getVesselsDataObservable().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  navigateToVesselForm(): void {
    this.router.navigate(['/vessels/add']);
  }
  editVessel(imoNumber: number): void {
    const vessel = this.dataSource.data.find(
      (vessel) => vessel.IMO_NUMBER === imoNumber
    );
    if (vessel) {
      const dialogRef = this.dialog.open(EditVesselFormComponent, {
        width: '400px',
        data: vessel,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.updateVessel(result);
        }
      });
    }
  }
  updateVessel(vessel: any): void {
    this.vesselsService.updateVessel(vessel).subscribe(
      () => {
        this.snackBar.open('Vessel updated successfully.', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.vesselsService.getVesselsData();
      },
      (error) => {
        this.snackBar.open('Failed to update vessel.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
  deleteVessel(vessel: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to delete this vessel?',
        confirmButton: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vesselsService.deleteVessel(vessel.IMO_NUMBER).subscribe(
          () => {
            this.snackBar.open('Vessel deleted successfully.', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
            this.vesselsService.getVesselsData();
          },
          (error) => {
            this.snackBar.open('Failed to delete vessel.', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
          }
        );
      }
    });
  }
}
