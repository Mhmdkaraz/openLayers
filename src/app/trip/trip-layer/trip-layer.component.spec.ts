import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripLayerComponent } from './trip-layer.component';

describe('TripLayerComponent', () => {
  let component: TripLayerComponent;
  let fixture: ComponentFixture<TripLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
