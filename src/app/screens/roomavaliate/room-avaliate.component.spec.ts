import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAvaliateComponent } from './room-avaliate.component';

describe('RoomAvaliateComponent', () => {
  let component: RoomAvaliateComponent;
  let fixture: ComponentFixture<RoomAvaliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomAvaliateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAvaliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
