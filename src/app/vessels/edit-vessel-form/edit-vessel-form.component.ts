import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vessel } from 'src/shared/vessel.model';

@Component({
  selector: 'app-edit-vessel-form',
  templateUrl: './edit-vessel-form.component.html',
  styleUrls: ['./edit-vessel-form.component.css'],
})
export class EditVesselFormComponent implements OnInit {
  vessel: Vessel;
  countries: string[] = [];

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditVesselFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vessel = new Vessel(
      data.IMO_NUMBER,
      data.VESSEL_NAME,
      data.COUNTRY,
      data.LATITUDE,
      data.LONGITUDE,
      data.SPEED,
      data.TIMEOFPOSITION
    );
  }

  ngOnInit(): void {
    this.http.get<any[]>('assets/countries.json').subscribe((data) => {
      this.countries = data.map((country) => country.name);
    });
  }

  save(): void {
    this.dialogRef.close(this.vessel);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
