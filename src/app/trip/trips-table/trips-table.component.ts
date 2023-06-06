import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TripService } from '../trip.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.css'],
})
export class TripsTableComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'VESSEL_NAME',
    'COUNTRY',
    'TRIP_NAME',
    'SEGMENT_ID',
    'PORT_FROM',
    'PORT_TO',
    'LATITUDE',
    'LONGITUDE',
    'Actions',
  ];
  constructor(
    private tripService: TripService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }
  ngOnInit(): void {
    this.tripService.getTripsDataObservable().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  navigateToTripForm(): void {
    this.router.navigate(['/trip/add']);
  }
  editTrip(trip: any): void {
    const tripId = trip.TRIP_ID;
    this.router.navigate(['/trip/edit', tripId]);
  }

  deleteTrip(trip: any): void {
    console.log(trip.TRIP_ID);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to delete this trip?',
        confirmButton: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tripService.deleteTrip(trip.TRIP_ID).subscribe(
          () => {
            this.snackBar.open('Trip deleted successfully.', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
            this.tripService.getTripsData();
          },
          (error) => {
            this.snackBar.open('Failed to delete trip.', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
          }
        );
      }
    });
  }
}
