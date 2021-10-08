import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTrackComponent } from './show-track.component';

describe('ShowTrackComponent', () => {
  let component: ShowTrackComponent;
  let fixture: ComponentFixture<ShowTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
