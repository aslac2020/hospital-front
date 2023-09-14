import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsSpecialtiesComponent } from './patients-specialties.component';

describe('PatientsSpecialtiesComponent', () => {
  let component: PatientsSpecialtiesComponent;
  let fixture: ComponentFixture<PatientsSpecialtiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsSpecialtiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsSpecialtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
