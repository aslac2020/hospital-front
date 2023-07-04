import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsultsComponent } from './create-consults.component';

describe('CreateConsultsComponent', () => {
  let component: CreateConsultsComponent;
  let fixture: ComponentFixture<CreateConsultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConsultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConsultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
