import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultsPatientsChartComponent } from './consults-patients-chart.component';

describe('ConsultsPatientsChartComponent', () => {
  let component: ConsultsPatientsChartComponent;
  let fixture: ComponentFixture<ConsultsPatientsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultsPatientsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultsPatientsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
