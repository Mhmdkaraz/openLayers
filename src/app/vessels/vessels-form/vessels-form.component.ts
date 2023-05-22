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
  countries: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private vesselsService: VesselsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
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
      },
      (error) => {
        console.error('Request error:', error);
        this.showSnackbar('Error occurred while adding the vessel', 'error');
      }
    );
    this.router.navigate(['/vessels/']);
    this.vesselsService.getVesselsData();
  }
  private showSnackbar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar', panelClass],
    });
  }
}
