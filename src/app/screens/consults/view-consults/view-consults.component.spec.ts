import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConsultsComponent } from './view-consults.component';

describe('ViewConsultsComponent', () => {
  let component: ViewConsultsComponent;
  let fixture: ComponentFixture<ViewConsultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConsultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewConsultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
