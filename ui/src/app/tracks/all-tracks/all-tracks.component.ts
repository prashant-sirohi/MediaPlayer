import { PlaylistsService } from 'src/app/services/playlists.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AllPlaylistsDialogComponent } from 'src/app/playlists/all-playlists-dialog/all-playlists-dialog.component';
import { TracksService } from 'src/app/services/tracks.service';
import { Track } from '../interfaces';
import { PlayerComponent } from 'src/app/player/player.component';

@Component({
  selector: 'app-all-tracks',
  templateUrl: './all-tracks.component.html',
  styleUrls: ['./all-tracks.component.scss']
})
export class AllTracksComponent implements OnInit {

  tracks: Track[] = [];
  currentActiveTrack: any;

  constructor(
    private tracksService: TracksService,
    private playlistsService: PlaylistsService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tracksService.getAll().subscribe((data: any)=> {
      this.tracks = data.tracks;
    })
  }

  goToNewTrack() {
    this.router.navigate(['new-track'])
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

  onPlayCommand(event){
    this.currentActiveTrack = event;
  }

}
