import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTracksDialogComponent } from './all-tracks-dialog.component';

describe('AllTracksDialogComponent', () => {
  let component: AllTracksDialogComponent;
  let fixture: ComponentFixture<AllTracksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTracksDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTracksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
