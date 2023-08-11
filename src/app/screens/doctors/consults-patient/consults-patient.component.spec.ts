import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultsPatientComponent } from './consults-patient.component';

describe('ConsultsPatientComponent', () => {
  let component: ConsultsPatientComponent;
  let fixture: ComponentFixture<ConsultsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultsPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
