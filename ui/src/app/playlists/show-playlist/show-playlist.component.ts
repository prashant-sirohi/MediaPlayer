import { AllTracksDialogComponent } from './../../tracks/all-tracks-dialog/all-tracks-dialog.component';
import { Playlist } from './../interfaces/playlist';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PlayerComponent } from 'src/app/player/player.component';
import { Track } from 'src/app/tracks/interfaces';

@Component({
  selector: 'app-show-playlist',
  templateUrl: './show-playlist.component.html',
  styleUrls: ['./show-playlist.component.scss']
})
export class ShowPlaylistComponent implements OnInit {

  constructor(
    private playlistsService: PlaylistsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  playlist: Playlist;
  tracks : Array<Track> = [];
  currentActiveTrack: any;
  playingTrackId: number;

  id: number;
  @ViewChild('playlistCover') private playlistCover;
  playlistCoverUrl: string;

  fileSizeLimit = 5242880; // 5 mb in bytes
  fileSizeExceeds = false;
  fileLabel: string = '';
  loading = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id
      this.playlistsService.getOne(this.id).subscribe(res => {
        this.playlist = res;
        this.tracks = res.tracks;
        this.playlistCoverUrl = this.createImageUrl(res.playlist_cover.url)
      })
    })
  }

  createImageUrl(imageUrl: string) {
    return imageUrl ? `${environment.apiBase}${imageUrl}` : null;
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    let formData: FormData = new FormData();

    if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (file.size > this.fileSizeLimit) {
                this.fileSizeExceeds = true;
                return;
            } else {
                formData.append('file', file, file.name);
                this.playlistsService.uploadPlaylistCover({formData, id: this.id}).subscribe(
                  event => {
                    this.playlistCoverUrl = this.createImageUrl(event.playlist_cover.url)
                  },
                err => {console.log(err)});
            }
        };
    }
  }

  openTracksDialog(){
      const dialogRef = this.dialog.open(AllTracksDialogComponent, {
        width: '800px',
        data: {
          playlistId: this.playlist.id,
          filterAddedSongs: true
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result?.length) {
          this.playlistsService.addTracksToPlaylist({tracks: result, playlistId: this.playlist.id}).subscribe(res => {
            this.playlist = res
          })
        }
      });
  }

  onPlayCommand(event){
    this.currentActiveTrack = event;
    this.playingTrackId = event.track.id;
  }

  onPlayingTrackChange(event){
    this.playingTrackId = event.track.id
  }
}
