import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackLiteComponent } from './track-lite.component';

describe('TrackLiteComponent', () => {
  let component: TrackLiteComponent;
  let fixture: ComponentFixture<TrackLiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackLiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
