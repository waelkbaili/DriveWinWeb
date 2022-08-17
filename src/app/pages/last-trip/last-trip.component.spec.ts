import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTripComponent } from './last-trip.component';

describe('LastTripComponent', () => {
  let component: LastTripComponent;
  let fixture: ComponentFixture<LastTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
