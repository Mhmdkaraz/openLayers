import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselsFormComponent } from './vessels-form.component';

describe('VesselsFormComponent', () => {
  let component: VesselsFormComponent;
  let fixture: ComponentFixture<VesselsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VesselsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VesselsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
