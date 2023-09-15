import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsAtendimentsChartComponent } from './doctors-atendiments-chart.component';

describe('DoctorsAtendimentsChartComponent', () => {
  let component: DoctorsAtendimentsChartComponent;
  let fixture: ComponentFixture<DoctorsAtendimentsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsAtendimentsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsAtendimentsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
