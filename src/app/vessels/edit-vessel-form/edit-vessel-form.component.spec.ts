import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVesselFormComponent } from './edit-vessel-form.component';

describe('EditVesselFormComponent', () => {
  let component: EditVesselFormComponent;
  let fixture: ComponentFixture<EditVesselFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVesselFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVesselFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
