import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VesselsService } from '../vessels.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vessels-form',
  templateUrl: './vessels-form.component.html',
  styleUrls: ['./vessels-form.component.css'],
})
export class VesselsFormComponent implements OnInit {
  vesselForm: FormGroup;
  vessel: any;
  countries: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private vesselsService: VesselsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.vessel = history.state.vessel;
    if (this.vessel) {
      this.vesselForm.patchValue({
        imoNumber: this.vessel.IMO_NUMBER,
        vesselName: this.vessel.VESSEL_NAME,
        country: this.vessel.COUNTRY,
      });
    }
    this.http.get<any[]>('assets/countries.json').subscribe((data) => {
      this.countries = data.map((country) => country.name);
    });
    this.vesselForm = new FormGroup({
      imoNumber: new FormControl('', [Validators.required]),
      vesselName: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });
  }
  onSubmit(): void {
    if (this.vesselForm.invalid) {
      this.showSnackbar('Error occurred while adding the vessel', 'error');
      return;
    }
    const formData = this.vesselForm.value;
    this.vesselsService.sendVesselsData(formData).subscribe(
      (response) => {
        console.log('Request successful:', response);
        this.showSnackbar('Vessel added successfully', 'success');
        this.vesselForm.reset();
        this.vesselsService.getVesselsData();
      },
      (error) => {
        console.error('Request error:', error);
        this.showSnackbar('Error occurred while adding the vessel', 'error');
      }
    );
    this.router.navigate(['/vessels']);
  }
  private showSnackbar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar', panelClass],
    });
  }
}
