import { PlaylistsService } from 'src/app/services/playlists.service';
import { Playlist } from './../interfaces/playlist';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import _ from 'lodash';

@Component({
  selector: 'app-all-playlists-dialog',
  templateUrl: './all-playlists-dialog.component.html',
  styleUrls: ['./all-playlists-dialog.component.scss']
})
export class AllPlaylistsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AllPlaylistsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      filterPlaylist: boolean;
      trackId: number;
    },
    private playlistsService: PlaylistsService) {}

  playlists: Playlist[];
  selectedPlaylists: Playlist[] = [];

  ngOnInit(): void {
    this.data
    if(this.data?.filterPlaylist) {
      this.playlistsService.getFilteredPlaylists(this.data.trackId).subscribe((res: any) => {
        this.playlists = res.playlists;
      })
    } else {
      this.playlistsService.getAll().subscribe((res: any) => {
        this.playlists = res;
      })
    }
  }

  selectPlaylist(checked: boolean, playlist: Playlist) {
    if(checked){
      this.selectedPlaylists.push(playlist);
    } else {
      _.remove(this.selectedPlaylists, sp => sp.id == playlist.id)
    }
  }

  close() {
    this.dialogRef.close();
  }

  done() {
    this.dialogRef.close(this.selectedPlaylists);
  }

}
