import { TracksService } from 'src/app/services/tracks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Track } from '../interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import _ from 'lodash';

@Component({
  selector: 'app-all-tracks-dialog',
  templateUrl: './all-tracks-dialog.component.html',
  styleUrls: ['./all-tracks-dialog.component.scss']
})
export class AllTracksDialogComponent implements OnInit {

  constructor(
    private tracksService: TracksService,
    public dialogRef: MatDialogRef<AllTracksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      filterAddedSongs: boolean;
      playlistId: number;
    },
  ) { }
  tracks: Track[];
  selectedTracks: Track[] = [];

  ngOnInit(): void {
    if(this.data?.filterAddedSongs) {
      this.tracksService.getFilteredTracks(this.data.playlistId).subscribe((res:any) => {
        this.tracks = res.tracks;
      })
    } else {
      this.tracksService.getAll().subscribe((res:any) => {
        this.tracks = res.tracks;
      })
    }
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

  onTrackDismissed(event: Track) {
    _.remove(this.selectedTracks, st => st.id == event.id)
  }

}
