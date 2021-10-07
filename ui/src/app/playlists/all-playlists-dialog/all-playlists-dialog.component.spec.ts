import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlaylistsDialogComponent } from './all-playlists-dialog.component';

describe('AllPlaylistsDialogComponent', () => {
  let component: AllPlaylistsDialogComponent;
  let fixture: ComponentFixture<AllPlaylistsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPlaylistsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlaylistsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
