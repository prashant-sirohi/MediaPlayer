import { TracksService } from 'src/app/services/tracks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Track } from '../interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-all-tracks-dialog',
  templateUrl: './all-tracks-dialog.component.html',
  styleUrls: ['./all-tracks-dialog.component.scss']
})
export class AllTracksDialogComponent implements OnInit {

  constructor(
    private tracksService: TracksService,
    public dialogRef: MatDialogRef<AllTracksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  tracks: Track[];
  selectedTracks: Track[] = [];

  ngOnInit(): void {
    this.tracksService.getAll().subscribe((res:any) => {
      this.tracks = res.tracks;
    })
  }

  selectTrack(track: Track) {
    this.selectedTracks.push(track);
  }

  close() {
    this.dialogRef.close(this.selectedTracks);
  }

  onTrackSelected(event: Track) {
    this.selectedTracks.push(event)
  }

}
