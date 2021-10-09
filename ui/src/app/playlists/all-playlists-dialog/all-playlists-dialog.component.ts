import { PlaylistsService } from 'src/app/services/playlists.service';
import { Playlist } from './../interfaces/playlist';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-all-playlists-dialog',
  templateUrl: './all-playlists-dialog.component.html',
  styleUrls: ['./all-playlists-dialog.component.scss']
})
export class AllPlaylistsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AllPlaylistsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private playlistsService: PlaylistsService) {}

  playlists: Playlist[];
  selectedPlaylist: Playlist;

  ngOnInit(): void {
    this.playlistsService.getAll().subscribe((res: any) => {
      this.playlists = res;
    })
  }

  selectPlaylist(playlist: Playlist) {
    this.selectedPlaylist = playlist;
    this.close();
  }

  close() {
    this.dialogRef.close(this.selectedPlaylist);
  }

}
