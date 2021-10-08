import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AllPlaylistsDialogComponent } from 'src/app/playlists/all-playlists-dialog/all-playlists-dialog.component';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { Track } from '../interfaces';

@Component({
  selector: 'app-track-line-item',
  templateUrl: './track-line-item.component.html',
  styleUrls: ['./track-line-item.component.scss']
})
export class TrackLineItemComponent implements OnInit {

  @Input() track: Track;
  @Input() allowActions: boolean = false;
  @Input() allowSelection: boolean = false;
  @Output() trackSelected = new EventEmitter<Track>();

  constructor(
    private playlistsService: PlaylistsService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openPlaylistDialog(trackId: number) {
    const dialogRef = this.dialog.open(AllPlaylistsDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addTrackToPlaylist(result.id, trackId)
    });
  }

  addTrackToPlaylist(playlistId, trackId) {
    this.playlistsService.addTrackToPlaylist({trackId, playlistId }).subscribe()
  }

  goToTrack() {
    this.router.navigate([`/tracks/${this.track.id}`])
  }

  selectTrack(track: Track) {
    this.trackSelected.emit(track)
  }

}
