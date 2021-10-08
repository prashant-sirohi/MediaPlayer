import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackLineItemComponent } from './track-line-item.component';

describe('TrackLineItemComponent', () => {
  let component: TrackLineItemComponent;
  let fixture: ComponentFixture<TrackLineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackLineItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
