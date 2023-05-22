import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselsTableComponent } from './vessels-table.component';

describe('VesselsTableComponent', () => {
  let component: VesselsTableComponent;
  let fixture: ComponentFixture<VesselsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VesselsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VesselsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
