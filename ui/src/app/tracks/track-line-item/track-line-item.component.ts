import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AllPlaylistsDialogComponent } from 'src/app/playlists/all-playlists-dialog/all-playlists-dialog.component';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { Track } from '../interfaces';
import _ from 'lodash';

@Component({
  selector: 'app-track-line-item',
  templateUrl: './track-line-item.component.html',
  styleUrls: ['./track-line-item.component.scss']
})
export class TrackLineItemComponent implements OnInit {

  @Input() track: Track;
  @Input() allowActions: string[] = [];
  @Input() allowSelection: boolean = false;
  @Input() trackIndex: number;
  @Output() trackSelected = new EventEmitter<Track>();
  @Output() currentTrack = new EventEmitter<any>();
  @Output() trackDismissed = new EventEmitter<Track>();
  apiBase = environment.apiBase;
  thumb: string = '../../../assets/default_track_cover.jpeg';
  showAddToPlaylistButton = false;
  showViewTrackButton = false;
  

  constructor(
    private playlistsService: PlaylistsService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showAddToPlaylistButton = _.includes(this.allowActions, 'add')
    this.showViewTrackButton = _.includes(this.allowActions, 'view')
  }

  openPlaylistDialog(trackId: number) {
    const dialogRef = this.dialog.open(AllPlaylistsDialogComponent, {
      width: '800px',
      data: {
        trackId: this.track.id,
        filterPlaylist: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      const playlistIds = _.map(result,'id')
      this.addTrackToPlaylist(playlistIds, trackId)
    });
  }

  addTrackToPlaylist(playlistIds, trackId) {
    this.playlistsService.addTrackToPlaylist({trackId, playlistIds }).subscribe()
  }

  goToTrack() {
    this.router.navigate([`/tracks/${this.track.id}`])
  }

  selectTrack(checked: boolean, track: Track) {
    checked ? this.trackSelected.emit(track) : this.trackDismissed.emit(track)
  }
  playThisTrack(track: Track){
    this.currentTrack.emit({track:track, index: this.trackIndex})
  }

}
